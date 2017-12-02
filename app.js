const Koa = require('koa2')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const render = require('./lib/render')
const { ObjectID } = require('mongodb')

const app = module.exports = new Koa()
require('./mongo')(app)

app.use(logger())
app.use(koaBody())
app.use(render)


const list = async (ctx) => {
  const posts = await ctx.app.blogs.find().toArray()
  posts.map((post) => post._id = post._id.toString())
  await ctx.render("list", { posts })
}

const add = async (ctx) => {
  await ctx.render("new")
}

const show = async (ctx) => {
  const id = ObjectID(ctx.params.id)
  const post = await ctx.app.blogs.findOne({ "_id": id })
  await ctx.render("show", { post })
}

const create = async (ctx) => {
  const title = ctx.request.body.title
  const body = ctx.request.body.body
  await ctx.app.blogs.insert({ title, body })
  ctx.redirect("/")
}


router.get("/", list)
router.get("/post/new", add)
router.get("/post/:id", show)
router.post("/post", create)

app.use(router.routes())

if (!module.parent) app.listen(3000)
