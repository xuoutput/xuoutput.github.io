---
title: docker的简单使用
date: 2018-12-10 17:30:23
tags:
- docker
categories:
- 后端
comments: false
permalink:
---

# docker 的简单使用

## docker 简介

[Flux7 Docker 系列教程（一）：Docker 简介](https://segmentfault.com/a/1190000002711327) 主要看英文版的好.
[Docker — 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/)

层叠的只读文件系统, 联合加载.

### Docker 3 个组件/3 个元素

3 个组件是 Docker Client, Docker Daemon, Docker index/Registry.
3 个元素是 Docker Container, Docker Image, DockerFile.

他们如何交互呢?

![d1.png](d1.png)
![d2.png](d2.png)
![d3.png](d3.png)

1. Docker Client：用户和 Docker 守护进程进行通信的接口，也就是 docker 命令。
2. Docker Daemon 守护进程：宿主机上用于用户应答用户请求的服务。
3. Docker Index：用户进行用户的私有、公有 Docker 容器镜像托管，也就是 Docker 仓库。
4. Docker constainer 容器：用于运行应用程序的容器，包含操作系统、用户文件和元数据。
5. Docker image 镜像：只读的 Docker container 容器模板，简言之就是系统镜像文件。
6. DockerFile：进行镜像创建的指令文件。

在学习 `Docker 组件`之前，先来看一下 `Docker` 底层到底是由什么组成的(暂时别看)

1. Namespace：隔离技术的第一层，确保 Docker 容器内的进程看不到也影响不到 Docker 外部的进程。
2. Control Groups：LXC 技术的关键组件，用于进行运行时的资源限制。
3. UnionFS（文件系统）：容器的构件块，创建抽象层，从而实现 Docker 的轻量级和运行快速的特性。

### 如何运行咯

运行任何应用都必须按照以下**两个步骤**来: **先有镜像再有容器, container 就是一个 image 的实例 instance**

1. 创建一个 image 镜像文件
2. 运行 container 容器

#### 1. 创建一个镜像文件

`Docker image`相当于一个只读的模板文件，保存着运行`container`所需要的所有的配置、文件；每次启动，都会以基础的 `Docker image`为模板，按照 `Dockerfile` 的指令，建立一个新的适用于你自己的 `Dokcer image`：实际上是在这个基础镜像上建立了一个新的应用层。

自己创建的 `Docker image`可以推送到 `Docker Index` 中心，然后提供给他人使用。

#### 2. 运行容器

`container`被运行后，会在原有的`image`上**创建一个可读写的层**，容器设置完毕网络之后便可以运行应用了。

docker 本身的启动, 本身就可以看做是一个守护进程 `service docker start/stop/restart`,在`/etc/default/docker`配置
查看 docker 运行没, `ps -ed | grep docker` 或 `status docker`

### 重点看 3 个概念 image container registry

[Docker — 从入门到实践](https://yeasy.gitbooks.io/docker_practice/content/)

#### 在说下概念

##### Docker 镜像

我们都知道，操作系统分为内核和用户空间。对于 Linux 而言，内核启动后，会挂载 root 文件系统为其提供用户空间支持。而 Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:18.04 就包含了完整的一套 Ubuntu 18.04 最小系统的 root 文件系统。

Docker 镜像是一个特殊的文件系统，除了提供容器运行时所需的程序、库、资源、配置等文件外，还包含了一些为运行时准备的一些配置参数（如匿名卷、环境变量、用户等）。镜像不包含任何动态数据，其内容在构建之后也不会被改变。

##### Docker 容器

镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的 类 和 实例 一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。

容器的实质是进程，但与直接在宿主执行的进程不同，容器进程运行于属于自己的独立的 命名空间。因此容器可以拥有自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。容器内的进程是运行在一个隔离的环境里，使用起来，就好像是在一个独立于宿主的系统下操作一样。这种特性使得容器封装的应用比直接在宿主运行更加安全。也因为这种隔离的特性，很多人初学 Docker 时常常会混淆容器和虚拟机。

##### Docker Registry

镜像构建完成后，可以很容易的在当前宿主机上运行，但是，如果需要在其它服务器上使用这个镜像，我们就需要一个集中的存储、分发镜像的服务，Docker Registry 就是这样的服务。

一个 Docker Registry 中可以包含多个 仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <仓库名>:<标签> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 latest 作为默认标签。

#### 镜像

获取, 查看, 创建, 删除

1. 获取镜像 `docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`
   1. 不给用户名会默认指定是 library
2. 使用 `docker run -it --rm ubuntu:18.04 bash` 进入后可以用 `exit` 或 `ctrl+d` 退出并停止容器.
   1. 这里主要是配合容器看
3. 列出顶层 `docker image ls [option] [名[:tag]]` 或 `docker images` 有个 s 和没有 s 的区别
   1. 看到 `<none>` 的是 **虚悬镜像(dangling image)**
   2. 用 -f 指定过滤 `docker image ls -f dangling=true` 删除这些没用的虚悬镜像 `docker image prune`
   3. 列出中间(所有镜像) `docker image ls -a`
   4. 只列出 id `docker image ls -q` 常配合删除用
   5. 自定义 ls 出来的表格格式 `docker image ls --format ""`
4. 删除 `docker image rm [选项] <镜像1> [<镜像2> ...]`
   1. 镜像可以是 镜像短 ID、镜像长 ID、镜像名 或者 镜像摘要, 查看摘要 `docker image ls --digests`
   2. 删除行为分为两类，一类是 Untagged，另一类是 Deleted. 镜像的唯一标识是其 ID 和摘要，而一个镜像可以有多个标签. 无标签指向, 无镜像依赖和无容器依赖时就是 deleted
   3. 批量删除, 配合 ls 一起用 `docker image rm $(docker image ls -q redis)`

创建的 dockerfile 后面说, `docker commint` 不用

#### 容器

查看, 启动和停止, 删除

1. 启动: 有两种方式，一种是基于镜像新建一个容器并启动，另外一个是将在终止状态（stopped）的容器重新启动
   1. `docker run -t -i ubuntu:18.04 /bin/bash`
   2. `docker container start` 将一个已经终止的容器启动运行
2. 后台运行 `docker run -d ubuntu:18.04 /bin/sh -c "while true; do echo hello world; sleep 1; done"` 加个 -d 参数
   1. `docker container ls` 看容器信息
   2. 获取容器的输出信息 `docker container logs [container ID or NAMES]` 和 `docker logs` 一样
3. 终止 `docker container stop` 来终止一个运行中的容器. 此外，当 Docker 容器中指定的应用终结时，容器也自动终止。
   1. 只启动了一个终端的容器，用户通过 `exit` 命令或 `Ctrl+d` 来**退出终端**时，所创建的容器立刻终止. **所以加参数 -d 和进入后再推出是有区别的**
   2. `docker container ls -a` 可以看终止状态的
   3. `docker container restart` 命令会将一个运行态的容器终止，然后再重新启动它
4. 进入容器: 在使用 -d 参数时，容器启动后会进入后台。
   1. 使用 `docker attach` 命令或 `docker exec` 命令
   2. attach 的 如果用 exit，会导致容器的停止
   3. `docker exec -it 69d1 bash` 用 exit，不会导致容器的停止
5. 删除 `docker container rm trusting_newton`
   1. `docker container ls -a` 命令可以查看所有已经创建的包括终止状态的容器, `docker container prune` 清理掉所有处于终止状态的容器
6. 导入导出: `docker export` 和 `docker import`
   1. `docker load`这个是镜像存储文件, 前面的 容器快照文件将丢弃所有的历史记录和元数据信息

#### 仓库

仓库（Repository）是集中存放镜像的地方, 一个容易混淆的概念是注册服务器（Registry）

1. `docker login [地址]` 和 `docker logout`
   1. `docker search centos` 和 `docker pull`
2. 打完 tag 后 push `docker tag ubuntu:18.04 username/ubuntu:18.04`, `docker push username/ubuntu:18.04`

自动构建

#### 数据和网络

数据就是 volume, 数据卷和主机目录

1. 查看 `docker volume ls`
   1. `docker volume inspect my-vol`
   2. 在容器中 `docker inspect web` 的 `"Mounts"` 字段
2. 创建 `docker volume create my-vol`
3. 删除 `docker volume rm my-vol`
   1. `docker volume prune` 数据卷 是被设计用来持久化数据的，它的生命周期独立于容器，Docker 不会在容器被删除后自动删除 数据卷，并且也不存在垃圾回收这样的机制来处理没有任何容器引用的 数据卷。如果需要在删除容器的同时移除数据卷。可以在删除容器的时候使用 docker rm -v 这个命令
4. 在创建容器时挂上卷 -v `--mount source=my-vol,target=/webapp` 缩写 `-v my-vol:/wepapp`

上面是创建了数据卷挂上, 还有是不用创建, 就是挂主机目录

1. `--mount type=bind,source=/src/webapp,target=/opt/webapp` 简写 `-v /src/webapp:/opt/webapp`
   1. 默认是读写的, 可以指定只读 `-v /src/webapp:/opt/webapp:ro`

所以只需要用 -v 就好, 也不用指定 type 了

网络就是参数 -p

### Docker 的 14 个命令,注意区分 image 和 container

![docker_command](docker_command.jpg)

1. `docker info`: 检查 Docker 是否安装, 显示 Docker 信息 `docker version`
2. `docker images`: 检查本机有多少个 docker image list, top level 的. `-a`看完整的, 包括中间层 images, `-q`只看 id
3. `docker inspect`看 top level layer 的 image 详情 MD 信息,也可以看 container, 如 IP,port, 配置信息
4. `docker search <imageName>`: 在 docker index 搜索镜像 `-s`star
5. `docker pull <image name>`: 下载镜像
6. `docker run busybox /bin/echo Hello worrld`: 运行 container,(-d -p) 是`docker create`和`docker start`结合, 创建 container 并运行 container `docker create`:是为指定 image 添加一个可读写层,构成一个新的 container. 从 image => container. `docker start`: 是为 container 文件系统创建了一个**进程隔离空间**, 每个容器只有一个. 里面跑不跑进程随意.
7. `docker ps`: 列出运行中的 container, -a 是所有不运行的也列出, 就是只看`start`不看`create`的咯和`docker container ls`,`docker container ls --all`
8. `docker logs <ID/>name>`: 查询输出,
9. `docker stop <ID/>name>`: 停止 container,优雅退出,回收进程空间 start 和 stop 可以多个 `docker kill <ID/>name>`直接杀. `docker container stop`这么写太繁琐
10. `ctl+p ctl+q`: 将容器后台, 也就是变为守护, attach, `exit`后`ctl+d`: 退出容器
11. `docker start/restart <ID/>name>`: 运行/重启 container `docker attach`重新进入-d 的守护容器
12. `docker exec`: 在运行中的 container 中(有了进程空间的)运行 command, 执行进程
13. `docker rm <ID/>name>`: 删除构成 container 的可读写层,要先 stop. `docker rmi <ID/>name>`是删 top level layer image, `docker rmi $(docker images -q)`: 删了所有层 . 就是`docker container rm`和`docker image rm` 简写
14. `docker commit <ID/>name> <newImageName>`: 保存 contaner 为新 image(将可读写层变为只读层, 无论容器运不运行, 注意层的 id 会变), `docker build`: 从一个 DockerFile 中建立 image(里面是 4 步,先 FROM 获取到 image, 然后重复地 1. `docker run`新建一层读写,然后分配进程空间, 再 2. `RUM` 执行命令 **RUN 其实就会新建一个读写层的** , 3. `docker commit`保存这层为只读层), 两种方式都可以构建镜像. `-t`是打 tag. 类似`git` 每一个修改都是一个`commit`, 保存记录.
15. `docker history <imageName>`: 获取镜像历史(只能是本地)
16. `docker push <user>/<repo_name>`: 推送镜像. `docker login` `-u -p`和`docker logout` :注意登录 id 不是邮箱, 然后这个 id 就算你注册的时候填了大写的, 注册成功后还都是小的, 看一下.(登不上就直接去 UI 桌面中登录好了)
17. `docker help`和`docker <command> --help`: 帮助
18. `docker update`: 更新 contain 而配置
19. `docker rename`重命名 container,也可以在`docker run`的时候指定 name
20. `docker top`: 列出一个 container 中的运行的进程.
21. `docker pause`暂停一个或多个 container 中的所有进程 `docker unpause`, 保留进程空间
22. `docker port`: 列出 container 的端口映射
23. `docker tag image username/repository:tag`: 给 image 打 tag,保留原始镜像, `docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]` 就是打一个 image 名字是`username/repository` tag 是`tag`

暂时不看的命令

1. `docker import`和`docker export` : `export`会把容器打`tar`,但会移除不必要的 MD 和 image 层, 只输出一个层,很好用. 只能看到一个 image, save 能看到历史镜像
2. `docker save`和`docker load`: 使用 `load` 从 `stdin` 导入一个 `tar` 格式的镜像或者仓库，然后用 `save` 将 `tar` 镜像输出到 `stdout`。`save`会把一个镜像,只能是镜像,打`tar`并保留每一层的 MD 信息. 两个命令就是方便在别的机器上用
3. `docker cp`: 从 container 中复制进去文件
4. `docker deploy`和
5. `docker diff`: 看 container 中文件改动
6. `docker events` `docker stats` `docker wait`

![run_commit](run_commit.png)

### 自动化 DockerFile

Docker 提供的 `Dockerfile` 是一个类似 `Makefile` 的工具，主要用来**自动化构建镜像**。既然能自动化创建镜像，那么我们何必去手动创建镜像呢。

#### 格式

`Dockerfile` 中所有的命令都是以下格式：`INSTRUCTION argument`
指令(INSTRUCTION)不分大小写，但是**推荐大写**。

#### FROM 命令

`FROM <imageName>`，例如 `FROM ubuntu`

所有的 `Dockerfile` 都用该以 `FROM` 开头，`FROM` 命令指明 `Dockerfile` 所创建的 image 文件以什么镜像为基础，`FROM` 以后的所有指令都会在 `FROM` 的基础上进行创建镜像；可以在同一个 `Dockerfile` 中多次使用 `FROM` 命令**用于创建多个 image**。

#### MAINTAINER 命令

`MAINTAINER <authorName>` 用于指定镜像创建者和联系方式。

例如:

```docker
MAINTAINER Victor Coisne victor.coisne@dotcloud.com
```

#### RUN 命令

`RUN <command>` 用于 container 内部执行命令。每个 `RUN` 命令相当于在原有的 image 基础上添加了一个**改动层**，原有的镜像不会有变化, 运行完后再提交成只读层. 即类似先`docker run`再`docker commit`

#### ADD 命令

`ADD <src> <dst>` 用于从将 `<src>` 文件复制到 `<dst>` 文件：`<src>` 是相对被构建的 DockerFile 的**相对路径**，可以是文件或目录的路径，也可以是一个远程的文件 url，`<dst>` 是 container 中的**绝对路径**。

#### COPY 命令

**只能讲和 Dockerfile 文件同目录中的内容**复制到 container 中的指定目录,通常是`WORKDIR`指定的工作目录,
如: Copy the current directory contents into the container at /app

```docker
COPY . /app
```

暂时只要这个命令是改动 1 个层, 不会有 Running 的那个层

[/var/lib/docker/tmp/docker-builderXXXXXXX/... no such file or directory #1922](https://github.com/docker/for-mac/issues/1922#issuecomment-418786503)

`WORKDIR`只是在 image 内设置路径

[说下`docker build`的最后的点`.`](https://stackoverflow.com/a/46201134/10282521)

```docker
docker build -t hello-demo-app .
```

which sets the current directory as the context, let's say you wanted the parent directory as the context, just use:

```docker
docker build -t hello-demo-app ..
```

#### CMD 命令

`CMD` 命令有 3 种格式：

- `CMD ["executable","param1","param2"]`：推荐使用的 exec 形式。
- `CMD ["param1","param2"]`：无可执行程序形式
- `CMD command param1 param2`：shell 形式。

`CMD` 命令用于**启动 container**时默认执行的命令,即`docker run`时的默认命令, 但如果`docker run`加了命令, 会覆盖`CMD`的. 而`ENTRYPOINT`不会被覆盖, 要覆盖需要`docker run --entry`加参数
，`CMD` 命令可以包含可执行文件，也可以不包含可执行文件：不包含可执行文件的情况下就要用 `ENTRYPOINT` 指定一个，然后 `CMD` 命令的参数就会作为`ENTRYPOINT`的参数。

> 一个 `Dockerfile` 中只能有一个`CMD`，如果有多个，则**最后一个生效**。
> `CMD` 的 shell 形式默认调用 `/bin/sh -c` 执行命令。
> `CMD`命令会被 `Docker` 命令行传入的参数覆盖：`docker run busybox /bin/echo Hello Docker` 会把 `CMD` 里的命令覆盖。

#### ENTRYPOINT 命令

`ENTRYPOINT` 命令的字面意思是进入点，而功能也恰如其意：**他可以让你的 container 表现得像一个可执行程序一样**。

`ENTRYPOINT` 命令也有 2 种格式：

- `ENTRYPOINT ["executable", "param1", "param2"]` ：推荐使用的 exec 形式
- `ENTRYPOINT command param1 param2` ：shell 形式

> 一个 Dockerfile 中只能有一个 `ENTRYPOINT`，如果有多个，则最后一个生效。

##### 关于 `CMD` 和 `ENTRYPOINT` 的联系请看下面的例子

仅仅使用 `ENTRYPOINT`：

```docker
FROM ubuntu
ENTRYPOINT ls -l
```

执行 `docker run 306cd7e8408b /etc/fstab` 和 `docker run 306cd7e8408b` 结果并不会有什么差别：

```docker
命令 # docker run 306cd7e8408b /etc/fstab
total 64
drwxr-xr-x   2 root root 4096 Mar 20 05:22 bin
drwxr-xr-x   2 root root 4096 Apr 10  2014 boot
drwxr-xr-x   5 root root  360 Apr 24 02:52 dev
drwxr-xr-x  64 root root 4096 Apr 24 02:52 etc
drwxr-xr-x   2 root root 4096 Apr 10  2014 home
……
```

但是我们**通常使用 `ENTRYPOINT` 作为 container 的入口，使用 `CMD` 给 `ENTRYPOINT` 增加默认选项**：

```docker
FROM ubuntu
CMD ["-l"]
ENTRYPOINT ["ls"]
```

然后执行这个 constainer：
不加参数便会默认有 `-l`参数：

```docker
命令 # docker run 89dc7e6d0ac1
total 64
drwxr-xr-x   2 root root 4096 Mar 20 05:22 bin
drwxr-xr-x   2 root root 4096 Apr 10  2014 boot
drwxr-xr-x   5 root root  360 Apr 24 02:47 dev
drwxr-xr-x  64 root root 4096 Apr 24 02:47 etc
drwxr-xr-x   2 root root 4096 Apr 10  2014 home
drwxr-xr-x  12 root root 4096 Mar 20 05:21 lib
drwxr-xr-x   2 root root 4096 Mar 20 05:20 lib64
drwxr-xr-x   2 root root 4096 Mar 20 05:19 media
drwxr-xr-x   2 root root 4096 Apr 10  2014 mnt
drwxr-xr-x   2 root root 4096 Mar 20 05:19 opt
dr-xr-xr-x 386 root root    0 Apr 24 02:47 proc
drwx------   2 root root 4096 Mar 20 05:22 root
drwxr-xr-x   7 root root 4096 Mar 20 05:21 run
drwxr-xr-x   2 root root 4096 Apr 21 22:18 sbin
drwxr-xr-x   2 root root 4096 Mar 20 05:19 srv
dr-xr-xr-x  13 root root    0 Apr 24 02:47 sys
drwxrwxrwt   2 root root 4096 Mar 20 05:22 tmp
drwxr-xr-x  11 root root 4096 Apr 21 22:18 usr
drwxr-xr-x  12 root root 4096 Apr 21 22:18 var
```

加了 `/etc/fstab` 参数便会覆盖原有的 `-l` 参数：

```docker
命令 # docker run 89dc7e6d0ac1 /etc/fstab
/etc/fstab
```

#### EXPOSE 命令

`EXPOSE <port> [<port>...]` 命令用来指定 container 对外开放的端口。
例如 `EXPOSE 80 3306`，开放 80 和 3306 端口, 但在`docker run`的时候还得在 host 上指定端口的

#### WORKDIR 命令

`WORKDIR /path/to/work/dir` 配合 `RUN`，`CMD`，`ENTRYPOINT` 命令**设置指令执行时的工作目录**。
可以设置多次，如果是相对路径，则相对前一个 `WORKDIR` 命令。默认路径为`/`。

会分 2 步变动层

例如：

```docker
FROM ubuntu
WORKDIR /etc
WORKDIR ..
WORKDIR usr
WORKDIR lib
ENTRYPOINT pwd
```

`docker run ID` 得到的结果为：`/usr/lib`

#### USER 命令

`USER <UID/Username>` 为 container 内指定 `CMD` `RUN` `ENTRYPOINT` 命令运行时的用户名或 UID。

#### VLOUME 命令

`VOLUME ['/data']` 允许 container 访问容器的目录、允许 container 之间互相访问目录。
`VOLUME` 仅仅是允许将某一个目录暴露在外面，更多的操作还需要依赖 `Docker` 命令实现。

更多的内容可以参考 [深入理解 Docker Volume（一）](http://dockone.io/article/128)

#### ENV 命令: Define environment variable

参考 `export` 的用法咧：
`ENV LC_ALL en_US.UTF-8`

#### 最佳实践

所有应用都会有个最佳的方式，[Dockerfile 也不例外](http://crosbymichael.com/dockerfile-best-practices.html)，下面是我们总结出的最佳实现方式：

1. 把维护者和更新系统的命令依次写在最上方
2. 使用标签管理 Dockerfile
3. 避免映射公共端口
4. 使用类似 array 形式的 CMD 和 ENTRYPOINT

> 注：映射端口并不属于 Dockerfile 的工作范围。

## 概念: [10 张图带你深入理解 Docker 容器和镜像](http://dockone.io/article/783)

### **Image Definition**

Image 就是一堆只读层（read-only layer）的统一视角
![image1.png](image1.png)

### **Container Definition**

容器（container）的定义和镜像（image）几乎一模一样，也是一堆层的统一视角，**唯一区别**在于容器的最上面那一层是可读可写的。
![container1.png](container1.png)

**container 只是在 image 上增加一层读写层, 并没有提及容器是否在运行**.
要点：容器 = 镜像 + 读写层。并且容器的定义并没有提及是否要运行容器。

### **Running Container Definition**

一个运行态容器（running container）被定义为一个可读写的统一文件系统**加上隔离的进程空间和包含其中的进程**。
![running_container1](running_container1.png)

正是文件系统隔离技术使得 Docker 成为了一个前途无量的技术。一个容器中的进程可能会对文件进行修改、删除、创建，这些改变都将作用于可读写层（read-write layer）。
![running_container2](running_container2.png)

### **Image Layer Definition**

为了将零星的数据整合起来，我们提出了镜像层（`image layer`）这个概念。下面的这张图描述了一个镜像层，通过图片我们能够发现一个层并不仅仅包含文件系统的改变，它还能包含了其他重要信息。
![image_layer1](image_layer1.png)

元数据（`metadata`）就是关于这个层的额外信息，它不仅能够让 Docker 获取运行和构建时的信息，还包括父层的层次信息。需要注意，只读层和读写层都包含元数据。
![image_layer2](image_layer2.png)

除此之外，每一层都包括了一个**指向父层的指针**。如果一个层没有这个指针，说明它处于最底层。
![image_layer3](image_layer3.png)

## 区别点

- `docker run` 与`docker start`的区别

[docker run 与 docker start 的区别，为容器命名](https://www.wangminli.com/?p=1184)
`docker run` 只在第一次运行时使用，将镜像放到容器中，以后再次启动这个容器时，只需要使用命令`docker start` 即可。
`docker run`相当于执行了**两步**操作：将镜像放入容器中（`docker create`）,然后将容器启动，使之变成运行时容器（`docker start`）。
![run_start.png](run_start.png)
而`docker start`的作用是，**重新启动已存在的镜像**。也就是说，如果使用这个命令，我们必须事先知道这个容器的**ID 或名字**，我们可以使用`docker ps`找到这个容器的信息。

- `docker run`和`docker exec`的区别

[“docker run”VS“docker exec”，这两个命令有区别吗？](https://yq.aliyun.com/articles/640877)
`docker run`通常是在**新创建**的容器中所使用的命令. 它适用于在没有其他容器运行的情况下，您想要创建一个容器，并且要启动它，然后在其上运行一个进程。**如果镜像已经在容器中了, 用`docker start`或`docker restart`**
`docker exec`适用于**在现有容器中**运行命令的情况。如果已经拥有了一个正在运行的容器，并希望更改该容器或从中获取某些内容，那么使用`docker exec`命令就非常合适了。

- `docker ps`和`docker images`

一个看 containers, 一个看 images
`docker ps` 命令会列出**所有运行中**的 container。这隐藏了非运行态容器的存在，如果想要找出这些容器，我们需要使用`docker ps -a`
`docker images`命令会列出了所有顶层（`top-level`）image。实际上，在这里我们**没有办法区分一个镜像和一个只读层**，所以我们提出了`top-level`镜像。**只有创建容器时使用的镜像或者是直接 pull 下来的镜像能被称为顶层（`top-level`）镜像**，并且每一个顶层镜像下面都隐藏了多个镜像层。

- `registry`和`repository`

registry 是 docker 提供的线上的那个 index,包含 repository, repository 是本地中所有 image,类似 git 的库,github 是 registry

- `RUN`和`CMD`

`RUN`是构建 image 时, 那一层 image 执行什么命令,而`CMD`是构建完 image 后,成为一个 container 后的命令

- `CMD`和`ENTRYPOINT`

`CMD`命令用于**启动 container**时默认执行的命令,即`docker run`时的默认命令, 但如果`docker run`加了命令, 会覆盖`CMD`的. 而`ENTRYPOINT`不会被覆盖, 要覆盖需要`docker run --entry`加参数

- 远程访问

就是 docker client 和 docker deamon 不在同一个 host 上, 平时通过 docker 命令访问 docker client 然后 docker client 会访问 deamon. 现在你可以直接通过远程 REST API 访问 docker deamon

- detach 和 attach 区别

`ctl+d`退出, `attach`再回到运行的容器中

- run 中 link 和 name 的区别

--name 只是别名, --link 是指定链接到那个容器

## 参考

[10 张图带你深入理解 Docker 容器和镜像](http://dockone.io/article/783)
[Flux7 Docker 系列教程（一）：Docker 简介](https://segmentfault.com/a/1190000002711327)
[Docker — 从入门到实践 666](https://yeasy.gitbooks.io/docker_practice/content/)
[Docker 联合文件系统(Union Filesystem)](https://www.jianshu.com/p/5ec3d4dbf580)
