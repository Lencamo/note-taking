## 什么是 git？

&emsp;&emsp;官方描述：

> Git 是一个免费和开源的 <span style="background-color:yellow;color:black">分布式版本控制系统</span>，旨在以速度和效率处理从小型到大型项目的所有内容。

> Git 易于学习， 占用空间小，性能快如闪电。具有廉价的本地分支、方便的暂存区域和 多个工作流等功能。

&emsp;&emsp;相关链接推荐：

> [git 官方文档](https://git-scm.com/book/zh/v2)

## 统一声明

&emsp;&emsp;后面描述的 git 命令: `[]`中的内容为可选内容，`|`表示或者的意思，`<>`中的内容为必写内容

&emsp;&emsp;默认有 Linux 命令基础、git 基础。

## 一、基础必知

### 1、git 几种状态 ✨

```sh
git status -s
```

通过简写的形式查看文件状态，红色表示在文件在`workspace`工作区，绿色表示文件在`index`暂存区。字母`A`表示首次出现的文件，`M`表示 commit 过的文件，`D`表示已经执行删除操作的文件

图示：

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/20220718170906.png" width=569px />

### 2、git 常用命令

```shell
# 1、查看文件状态
git status [-s]
# 【注意：-s表示以简写的形式展示结果🚩】

# 2、提交至index区
git add [<fileName> | . | -u | -A]
# 【注意： . 只对当前目录有效，但不包括D状态的文件。
        # -u 对整个git目录有效，但不包括??状态的文件。
        # -A 提交所有。】

git commit [-a] [<fileName>] -m"<对应commit的message信息>"
# 【注意：信息内容使用双引号。
#        -a表示执行commit的同时也执行了add操作】
```

## 二、git 个人配置

直接查看与编辑配置文件：

> 手动配置：`C:\Users\<电脑用户名>\.gitconfig`

```sh
# 查看
git config [--global] --list

# 编辑（以默认的编辑器打开）
git config [--global] --edit
```

### 1、全局配置

#### ① 署名

```sh
git config --global user.name <署名>
```

#### ② 邮箱

```sh
git config --global user.email <邮箱>
```

#### ③ 默认编辑器

```sh
# 默认为vim编辑器

# 1、设置vscode为默认编辑器
git config --global core.editor "code --wait"

# 2、还原vim为默认编辑器
git config --global -unset core.editor
```

#### ③ main 分支配置

&emsp;&emsp;自 2020 年 10 月 1 日开始，GitHub 新建仓库的默认分支名由“master 分支”改为了“main”。

```sh
# git init时的默认分支配置
git config --global init.defaultBranch main
```

&emsp;&emsp;对创建但未`git push`的原 master 分支项目：

```sh
# 当前master分支改名为main
git branch -M main
```

### 2、日志配置

```sh
# 查看commit信息
git log [--oneline]
# 查看分支结构
git log --oneline --decorate --graph --all

# 查看操作记录
git reflog
```

配置个性化的 git 命令别名()：

```sh
git config --global alias.slog "log --oneline --decorate --graph --all"

git config --global alias.olog "log --pretty=format:'%h | %an | %ar | %s'  --decorate --graph --all"

git config --global alias.plog "log --pretty=format:'%C(yellow)[%h] %C(magenta)%an %C(cyan)%ad  %C(auto)- %s' --date=format:'%Y-%m-%d %H:%M:%S %A' --decorate --graph --all"
```

### 3、忽略文件配置

> [官方文档](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)

> [忽略文件查询](https://github.com/github/gitignore)

文件 .gitignore 的格式规范如下：

- 以 <span style="color:red"># 开头</span>的是注释
- 以 <span style="color:red">/ 结尾</span>的是目录
- 以 <span style="color:red">/ 开头</span>防止递归
- 以 <span style="color:red">! 开头</span>表示取反

glob 模式是指 shell 所使用的简化了的正则表达式：

- `*` ：匹配零个或多个任意字符
- `[abc]` ：匹配任何一个列在方括号中的字符
- `?` ：只匹配一个任意字符
- `**` ：匹配任意中间目录

示例：

```sh
# 忽略所有的 .a 文件
*.a

# 但跟踪所有的 lib.a，即便你在前面忽略了 .a 文件
!lib.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 忽略任何目录下名为 build 的文件夹
build/

# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```

## 三、本地仓库

### 声明 ✨：

工作区文件的几种状态：

&emsp;&emsp;未跟踪(<span style="color:Salmon">??</span>)、未修改、已修改(<span style="color:Salmon">M</span>)

工作区文件的几种状态：

&emsp;&emsp;已暂存(<span style="color:LightGreen">M</span>)

### 1、提交

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/图2.png" width=759px />

```sh
# ① 工作区提交到暂存区
git add [<fileName> | . | -u | -A]
# 【注意： . 只对当前目录有效，但不包括D状态的文件。
        # -u 对整个git目录有效，但不包括??状态的文件。
        # -A 提交所有。】

# ② 暂存区提交到本地仓库
git commit [-a] [<fileName>] -m"<对应commit的message信息>"
# 【注意：信息内容使用双引号。
#        -a表示执行commit的同时也执行了add操作】
```

### 2、撤销

<img src="https://deer-sir.oss-cn-chengdu.aliyuncs.com/note-taking/图1.png" width=760.5px />

```sh
# ① 已暂存 撤销到 已修改
git reset [--mixed] [HEAD] [<fileName> | .]
# ② 已修改 撤销到 未修改
git checkout <fileName> | .

# ③ 已暂存 撤销到 未修改
git checkout HEAD [<fileName> | .]

# ④ 清除未跟踪
git clean -f <fileName> | .
```

### 3、比较

```sh
# ① 已暂存 和 已修改
git diff <fileName>
# ② 已修改 和 未修改
git diff HEAD <fileName>

# ③ 已暂存 和 未修改
git diff --cached <fileName>
```

### 4、删除

```sh
# ① 删除 未修改
git rm <fileName>

# ② 删除 已暂存 和 已修改
git rm < -f | --cached > <fileName>
```

## 四、版本管理

### 声明 ✨：

commit 版本的几种状态（`<commit版本>`）：

- HEAD ：当前 commit 版本
- HEAD^ ：前几个 commit 版本（几个`^`代表前几个）
- HEAD~n ： 第 n 个 commit 版本
- <hash 值> ：指定的 commit 版本

### 1、reset 与 revert 回滚

<span style="background-color:yellow;color:black">相同点</span>：

&emsp;&emsp;reset 和 revert 都是回到了指定的 commit 版本。

<span style="background-color:yellow;color:black">不同点</span>：

&emsp;&emsp;reset<span style="color:green">抛弃了指定版本后面提交的 commit 版本</span>，直接回到指定的 commit 版本。

&emsp;&emsp;revert<span style="color:green">相当于复制了一份指定的 commit 版本</span>，并进行了提交。

①reset 命令 🚩：

```sh
# 1、保留 workspace工作区和index缓存区的文件
git reset --soft <commit版本>

# 2、保留 index缓存区的文件(默认)
git reset [--mixed] <commit版本>

# 3、完全回到指定的commit版本
git reset --hard <commit版本>
```

【注意：

&emsp;&emsp;使用 reset 命令时，最好是针对未`git push`过的分支或 commit 版本，不然会因为本地仓库版本落后与远程仓库版本而`git push`不成功】

②revert 命令

```sh
git revert <commit版本>
```

【使用 revert 就不会有使用 reset 后`git push`不成功的问题】

### 2、stash 存储

注意：

&emsp;&emsp;① 经过`git stash`存储后的文件，在`git apply|pop` 恢复时，文件全部显示为工作区文件状态。

&emsp;&emsp;② 暂存区的文件经过`stash`会变成工作区文件（ <span style="color:LightGreen">M</span><span style="color:Salmon">M</span>状态的文件在`stash`时，会选择<span style="color:Salmon"> M</span>状态的文件进行存储 ）。

应用场景：

> 修复紧急 bug/需求时，但又不想 commit 当前工作区正在编写的文件，可以先`stash`存储未提交的文件。然后 git pull 先处理的紧急 bug/需求，解决完需求后再`apply`恢复即可。

```sh
git stash [. | -u | -a]
# 【注意： . 只对当前目录有效，但不包括D状态的文件
        # -u 对整个git目录有效，但不包括??状态的文件
        # -a 暂存所有 】

git stash list

git stash apply [HEAD@{n} | n]
git stash pop [HEAD@{n} | n]

git stash drop [HEAD@{n} | n]
git stash clear
```

### 3、rebase 重写历史 🤔

① 仅操作 massage 信息

- 操作注释信息：

```sh
# 1、选择操作的commit版本的编辑区间
git rebase -i [startpoint]  [endpoint]
# 【默认endpoint为`HEAD`，startpoint可以表示为`HEAD~n`，并且区间为前开后闭】

# 2、选择操作类型
……[reword | squash | drop ——> 修改 | 合并 | 删除]
```

② 操作 message 信息和 commit 文件内容

- 修改注释信息和文件内容

```sh
# 1、选择操作的commit版本的编辑区间
git rebase -i [startpoint]  [endpoint]
# 【默认endpoint为`HEAD`，startpoint可以表示为`HEAD~n`，并且区间为前开后闭】

# 2、选择操作类型
……[ edit ——> 修改]

# 3、编辑并处理冲突：
# 编辑文件后提交
git add .
# commit的同时可编辑message
git commit --amend [-m"<新的message信息>"] # 修改最近的一次commit的message
# 结束
git rebase --continue
```

- 拓展应用

```sh
# 当前add的文件 与 已经commit版本的文件内容结合
git reset --soft <commit版本>  # 可使用结合使用
git commit --amend [-m"<新的message信息>"]
```

【注意：

&emsp;&emsp;和 reset 命令一样，使用 rebase 命令时，最好是针对未`git push`过的分支或 commit 版本，不然会因为本地仓库版本与远程仓库版本不一致而`git push`不成功】

### 4、tag 标签

常见的版本修饰词

- beta：测试版
- release：发行版
- lts：长期维护版本
- rc：即将作为正式版发布
- alpha：内部版本

```sh
# 1、创建
git tag <tagName>
git tag -a <tagName> [commit版本] [-m"<对应标签的message信息>"]
# 【tagName示例：X.XX.XX.[<修饰词>]】

# 2、查看
git tag [-l "v3.3.*"]
# 【-l表示要过滤的版本】
git show <版本号>

# 3、删除
git tag -d <tagName>
git push origin --delete :refs/tags/<tagName>

# 4、远程共享
git push <远程仓库名> < <tagName> | --tags >
```

## 五、分支

### 1、基础命令

```sh
# 1、创建
git branch <分支名>
git checkout -b <分支名>

# 2、查看、切换
git checkout <分支名>
git branch [-a] [-v]

# 3、删除
git branch <-d | -D > <分支名>
# 【-d 和 -D的区别为：-D不用检查merge状态】

# 4、合并
git merge <分支名>
```

### 2、rebase 变基 🤔

思考？

> merge 和 rebase 区别

### 3、远程分支 🤔

```sh
# 删除
git push origin --delete serverfix
```

### 4、cherry-pick 遴选

> [参考链接](https://ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

应用场景

> 当前你在负责开发一个分支实现功能 A（完成，且为一个 commit 版本）、功能 B（未完成）。由于上线测试需求，要先功能 A 合并到 master 分支上，此时就可以使用`cherry-pick`将已实现功能 A 的 commit 版本单独复制并合并到 master 分支上。

```sh
git cherry-pick [ -e | -n ] <commit版本>
# 【注意：-e 表示会打开编辑器编辑合并的commit信息
#        -n 表示只是更新工作区、缓存区，不产生commit版本】
```

若发生合并冲突：

```sh
# 继续合并
git add.
git cherry-pick --continue

# 放弃合并
# 1、回归原始状态
git cherry-pick --abort
# 2、保留冲突状态在工作区
git cherry-pick --quit
```

## 六、远程仓库

【会覆盖当前工作区的内容】

### 1、基础命令

```sh
# 1、拉取到工作区
# 方式1
git pull [<远程仓库名> <远程分支名>:<本地分支名>]
# 【示例: git pull origin master:master】
# 强制拉取
git fetch --all && git reset --hard origin/master && git pull
# 【说明：先获取远程更新的数据 和 回退工作区/暂存区/版本库，最后再pull】

# 方式2
git clone <url>
# 【克隆下来的远程仓库名默认为origin】
# 等效于：
git fetch # 先拉取远程仓库中新的commit（得到🚩远程仓库中所有分支的引用：参考.git/FETCH_HEAD文件）
git merge # 再合并远程仓库中所有分支的引用

# 2、推送到远程仓库
git push [-u <远程仓库名> <远程分支名>]
# 【示例：-u origin master】
# 强制推送
git push -f
```

### 2、关联远程仓库

通常<span style="background-color:yellow;color:black">新</span>建立的 GitHub 仓库会有提示信息：

> git remote add origin \<url>
> git push -u origin master

```sh
# 1、关联
git remote add <远程仓库名> <url>

# 2、查看
git remote -v

# 3、移除关联
git remote remove <远程仓库名>
```

方式一：

```sh
git init
git remote add origin <url>
git push -u origin master
```

方式二：

```sh
git clone <url>
git remote add origin <url>
git push -u origin master
```

### 3、解决冲突

&emsp;&emsp;防止发生冲突的关键是：潜意识里要提高远程仓库的地位（即开发时，先 pull）。

> 注意：若直接手动解决冲突文件，默认采取的是 merge 操作，并且会产生一次 commit

> 冲突产生原因：有人已经 push 的文件和你的文件发生冲突

① pull 冲突

- 未 commit 过，pull 时发生冲突
  （可以先 ✨stash 工作区内容，然后 pull）

```sh
git reset --soft HEAD
git stash .
git pull
git apply [HEAD@{n} | n]
# 【此时就可以在工作区进行版本比较了】
```

- 已 commit 未 push，pull 时发生冲突
  （先 push，下次需要的时候再 pull）

```sh
git push
```

- 过 commit 过，
  （可以先 reset 到上一个版本，然后 stash 工作区内容，再 pull）

② push 冲突

```sh
git pull
# ……然后直接修改冲突内容
git add.
git commit -m"<对应commit的message信息>"
git push
```

## 七、SSH 免密 与 多账号管理

> 解决`git pull`要登录远程仓库作者账号问题

问题描述：

- <span style="color:green">https://</span> 开头的地址, 需要账号密码才能克隆/推送
- <span style="color:green">git@</span> 开头的地址, 需要 ssh 秘钥文件配置好后, 能免账号密码克隆/推送

### 1、ssh 免密

① 本地生成 key

```sh
# 生成
ssh-keygen -t rsa -C "GitHub邮箱"

# ……一路回车即可

# 查看
cat ~/.ssh/id_rsa.pub
```

② GitHub 关联 key

&emsp;&emsp;GitHub 生成 SSH Key，内容为上面 id_rsa.pub 文件中的内容（具体操作：略）。

③ 连接测试

```sh
ssh -T git@github.com
```

### 2、多账号管理

> [参考链接](https://www.cnblogs.com/popfisher/p/5731232.html)

&emsp;&emsp;有时候，尽管我们只有一台电脑，但可能你会同时使用多个远程仓库账号：GitHub 账号、gitee 账号（同时你还可能有不止一个 GitHub 账号）

#### ① 生成 SSH 密码

- GitHub

```sh
ssh-keygen -t rsa -C "GitHub邮箱"
# 然后依次输入
/c/Users/<电脑用户名>/.ssh/id_rsa_github.pub
# [设置本地pull密码]
```

- Gitee

```sh
ssh-keygen -t rsa -C "gitee邮箱"
# 然后依次输入🚩
/c/Users/<电脑用户名>/.ssh/id_rsa_gitee.pub
# [设置本地pull密码]
```

- Codeup

```sh
ssh-keygen -t ed25519 -C "codeup邮箱"
# 然后依次输入🚩
/c/Users/<电脑用户名>/.ssh/id_ed25519_codeup.pub
# [设置本地pull密码]
```

#### ② 多账号配置

- 配置文件 config

```sh
cd ~/.ssh && touch config

vim config
# 按i编辑
# 按Esc后输入:wq退出编辑
```

Host 后的内容为：<span style="background-color:yellow;color:black">HostName 别名</span>

```java
# 配置github.com
Host github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa_github
    PreferredAuthentications publickey
    User <使用git时个人配置的user.name>

# 配置gitee.com
Host gitee.com
    HostName gitee.com
    IdentityFile ~/.ssh/id_rsa_gitee
    PreferredAuthentications publickey
    User <使用git时个人配置的user.name>

# 配置codeup.aliyun.com
Host codeup.aliyun.com
    HostName codeup.aliyun.com
    IdentityFile ~/.ssh/id_ed25519_codeup
    PreferredAuthentications publickey
    User <使用git时个人配置的user.name>
```

#### ③ GitHub 关联 key

- key 的目录

```sh
cd ~/.ssh
```

&emsp;&emsp;将本地生成 SSH Key（即：`id_rsa_github.pub`/`id_rsa_gitee.pub`/`id_ed25519_codeup.pub` 文件）中的内容，拷贝到相应的代码托管平台的 SSH 公钥处。

#### ④ 连接测试

```sh
ssh -T git@<HostName 别名>

# GitHub账号
ssh -T git@github.com

# gitee账号
ssh -T git@gitee.com

# codeup账号
ssh -T git@codeup.aliyun.com
```

## 八、vscode 开发与 git 使用

虽然直接在 Git Bash 中使用 git 命令有诸多好处，但也有一定的缺点：

- 当 commit 版本、分支较多时，不便于观察
- 实际开发中 commit 版本、文件间的`diff`差异比较在 Git Bash 中也不便于观察
- ……

### 1、vscode 添加 git 终端

具体操作：略

### 2、Git Graph 和 GitLens 插件 🚩

下面列出我比较看中的功能

① Git Graph

- 查看分支结构
- 查看每个 commit 版本的 commit 了哪些文件

② GitLens

&emsp;&emsp;我通常会勾选：

- File History：用来比较单个文件的版本差异
- Commits：用来比较两个 commit 版本间的差异
- Stashes：方便进行`stash`存储管理

### 总结

&emsp;&emsp;个人还是强烈推荐详细的学习一下 git 命令。因为通过命令的方式不仅可以迅速的完成操作，还可以对当前 git 项目文件的状态有一个良好的感知。

> 以 git 命令为主，插件工具为辅

&emsp;&emsp;对 git 插件、git 工具使用久了会产生依赖。若换了个插件、工具，又或者它们里面没有你想要的 git 功能，岂不是违和感暴增 😂。
