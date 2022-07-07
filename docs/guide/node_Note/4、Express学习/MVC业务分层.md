&emsp;&emsp;MVC 分层业务，以前面的案例为例：

### 1、以前

- routes/users.js

```js
// 增
router.post('/user', (req, res) => {
  const { username, password, age, phone } = req.body

  UserModel.create({
    username,
    password,
    age,
    phone
  }).then((data) => {
    console.log(data)

    res.send({
      ok: 1
    })
  })
})

// 改
router.put('/user/:id', (req, res) => {
  const { username, password, age, phone } = req.body
  const _id = req.params.id

  UserModel.updateOne(
    { _id },
    {
      username,
      password,
      age,
      phone
    }
  ).then((data) => {
    console.log(data)

    res.send({
      ok: 1
    })
  })
})
```

### 2、现在

- routes/users.js

```js
// 分层✨一
router.post('/user', UserController.addUser)

router.put('/user/:id', UserController.updateUser)
```

- controllers/UserController.js

```js
const UserController = {
  // 异步💖处理（send的时机）
  addUser: async (req, res) => {
    const { username, password, age, phone } = req.body

    // 分层✨二
    await UserService.addUser

    res.send({
      ok: 1
    })
  }

  updateUser: async (req, res) => {
    const { username, password, age, phone } = req.body
    const _id = req.params.id

    await UserService.updateUser(_id,username, password, age, phone)

    res.send({
      ok: 1
    })
  }
}

module.exports = UserController
```

- services/UserService.js

```js
const UserModel = require('../model/UserModel')

const UserService = {
  addUser: () => {
    return UserModel.create({
      username,
      password,
      age,
      phone
    })
  }

  updaUser: (_id,username, password, age, phone)=> {
    return UserModel.updateOne(
    { _id },
    {
      username,
      password,
      age,
      phone
    }
  )
  }
}

module.exports = UserService
```
