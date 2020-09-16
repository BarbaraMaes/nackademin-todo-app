const chai = require("chai");
const chaiHttp = require("chai-http");

const authModel = require("../models/Auth");
const todoModel = require("../models/CRUD-Todo");
const { expect, request } = require("chai");
const app = require("../app");
chai.use(chaiHttp);

describe("test", () => {
    it("fake test", function () {
        expect(true).to.equal(true);
    })
})

describe("todolist", () => {
    beforeEach(async function () {
        //clear user database
        await authModel.clear();
        await todoModel.clear();
        //create a user so we can post todolists
        this.currentTest.user = await authModel.signup("babs@test.com", "123");
        //post a todolist ( new to do list )
        this.currentTest.listTitle = "listTitle";
        this.currentTest.list = await todoModel.postList(this.currentTest.listTitle, this.currentTest.user._id);

    })
    it("should return a todolist", async function () {
        expect(this.test.list).to.deep.include({ title: this.test.listTitle, userId: this.test.user._id });
    })
    it("should add an item to a todolist", async function () {
        const title = "todoTitle";
        const description = "todoDescription";
        //post a todo item to an existing list
        await todoModel.postItem(this.test.list._id, title, description);
        const updatedList = await todoModel.getItem(this.test.list._id);
        //items: [{ title: title, description: description, done: false }] 
        expect(updatedList).to.deep.include({ userId: this.test.user._id, title: this.test.listTitle });
    })
    it("should get the owner of a todolist", async function () {
        const ownerId = await todoModel.getOwner(this.test.list._id);
        expect(ownerId.userId).to.equal(this.test.user._id);
    })
})

describe("Integration tests for todolist endpoints", () => {
    beforeEach(async function () {
        //create and login user
        await authModel.clear();
        await todoModel.clear();
        //create a user so we can post todolists
        this.currentTest.user = await authModel.signup("babs@test.com", "123");
        this.currentTest.token = await authModel.login("babs@test.com", "123");

    })
    it("should create a todolist", async function () {
        const title = "listTitle";
        const userId = this.test.user._id
        const fields = { title, userId };
        chai.request(app)
            .post("/todo/")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + this.test.token.token)
            .send(fields)
            .end((error, result) => {
                expect(result).to.have.status(201)
                expect(result.body.list).to.deep.include({ title: title, userId: userId })
            })
    })
    it("should create a todo-item on a list", async function () {
        const title = "itemTitle";
        const description = "itemDescription";
        const fields = { title, description };
        const list = await todoModel.postList("listTitle", this.test.user._id);
        chai.request(app)
            .post("/todo/" + list._id)
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + this.test.token.token)
            .send(fields)
            .end((error, result) => {
                expect(result).to.have.status(201)
                expect(result.body.item).to.equal(1)
                //expect(result.body).to.deep.nested.include({ 'item.items[0]': { title: title, description: description, done: false } })
            })
    })
    it("should return all todo-lists", async function () {
        const title = "itemTitle";
        const description = "itemDescription";
        const fields = { title, description };
        const list = await todoModel.postList("listTitle", this.test.user._id);
        await todoModel.postList("listTitle2", this.test.user._id);
        const item = await todoModel.postItem(list._id, title, description);
        chai.request(app)
            .get("/todo/")
            .set("Content-Type", "application/json")
            .set("Authorization", "Bearer " + this.test.token.token)
            .end((error, result) => {
                expect(result).to.have.status(200);
                //console.log(result.body);
                //expect(result.body).to.deep.nested.include({ 'item.items[0]': { title: title, description: description, done: false } })
            })
    })
})
