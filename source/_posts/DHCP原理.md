---
title: DHCP原理
date: 2018-12-27 20:02:48
tags:
- DHCP
categories:
- 网络
comments: false
permalink:
---

# DHCP原理

DHCP，DNS和HTTP是3种常见的高层协议。

`DHCP(Dynamic Host Configuration Protocol)`,动态主机配置协议，是一个应用层协议。当我们将**客户主机**ip地址设置为动态获取方式时，**DHCP服务器就会根据DHCP协议给客户端分配IP**，使得客户机能够利用这个IP上网。

> 首先client要设置为DHCP获取, server常见就是路由器咯

`DHCP`的前身是`BOOTP`协议（`Bootstrap Protocol`）,`BOOTP`被创建出来为连接到网络中的设备自动分配地址，后来`被DHCP取代了`，DHCP比BOOTP更加复杂，功能更强大。后面可以看到，在用Wireshark过滤显示DHCP包，需要输入**过滤条件BOOTP**，而不是DHCP.

![dhcp1](dhcp1.png)

DHCP的实现分为4步，分别是：
第一步：Client端在局域网内发起一个DHCP　Discover包，目的是想发现能够给它提供IP的DHCP Server。
第二步：可用的DHCP Server接收到Discover包之后，通过发送DHCP Offer包给予Client端应答，意在告诉Client端它可以提供IP地址。
第三步：Client端接收到Offer包之后，发送DHCP Request包请求分配IP。
第四步：DHCP Server发送ACK数据包，确认信息。

加了DHCP relay

![dhcp_client_server](dhcp_client_server.png)

## wireshark抓包

## 具体看包再分析下每步

___
![wireshark1](wireshark1.png)

### 一、发现阶段：客户机寻找DHCP服务器

截图分析：

1. 客户端不知道自己的IP，以`0.0.0.0`标识，此时不知道DHCP服务器的IP地址，以`255.255.255.255`广播地址标识；MAC地址暂时不管.
2. 其他主机接收到此包，直接丢弃；DHCP服务器搜到后会响应此包，（**注可以被多台DHCP服务器接收,所以才有DHCP Request**）
3. 客户机端口为68，DHCP端口为67，为默认端口号；

___
![wireshark2](wireshark2.png)

### 二、提供阶段：DHCP服务器提供IP地址

1. 此包从DHCP服务器到客户端路上，客户机并暂时还没有`100.100.57.222`的IP地址；

2. DHCP服务器优先基于`ARP`协议与之通信(单播返回)，如果失败，直接提供**广播方式**发送；

___
![wireshark3](wireshark3.png)

### 三、请求阶段：客户机请求DHCP服务器之一确认提供的IP地址

若多台DHCP服务器为其提供Offer信息，则客户机只接收第一台DHCP服务器的IP地址，那么**第一台DHCP服务器**如何知道自己提供的IP地址被接收？**其他DHCP服务器如何知道自己提供的IP地址没有被接收呢**？(所以要告诉所有的)

1. 客户机虽然接收到分配的IP地址，但是没有与DHCP服务端进行确认，并不能开始使用；

2. 这是一个与图1相同的**广播形式`request`**的数据包，目的在于与第一个DHCP服务器进行确认，与其他DHCP服务器进行通信，告知其分配的IP地址并未采用，这是如何实现的呢？截图分析：

![wireshark3.1](wireshark3.1.png)

3. 图3的数据包，相应网络范围内的DHCP服务器均会收到，每台DHCP服务器检查`DHCP Sever Identifier`字段，如果是本机IP，则确认其分配的即`Requested IP Address`有效；如果不是本机IP，则其分配的IP地址则无效；

___
![wireshark4](wireshark4.png)

### 四、确认阶段：DHCP服务器确认IP字段有效

1. 仅图4中确认IP地址有效的DHCP服务器，返回Ack数据包；

2. 此数据包包含在本文开头时强调的上网的基本信息，实现动态上网；

___

故事到这里是否就可以圆满结束了呢？那动态主机配置如何体现其动态过程呢？看官切勿着急，工程师们热爱的是全面的系统，怎么会置之不理呢？

![wireshark5](wireshark5.png)

### 五、重新登录与更新租约

1. **客户机重新启动后(或关闭WiFi再打开**)，不再直接发送Discover信息，而是发送`Request`信息；DHCP服务器会优先尝试，允许其继续使用IP地址，发送Ack数据包；如果该IP不能再使用，返回`Nack`数据包，**客户机重新开始Discover阶段**；
2. DHCP客户机启动时和IP租约期限过一半时，DHCP客户机都会自动向DHCP服务器发送更新其IP租约的信息，与1）中过程相同；

### 总结

![dhcp_client_server2](dhcp_client_server2.png)

DHCP协议简析就到这里啦，本次的内容简单实用，重点在于Request阶段的那个具备广播属性的数据包，作用有二，其一是与第一个DHCP服务器确认其IP地址的有效性，其二是与其他DHCP服务器说明其IP地址并未被采用。

## 包结构分析



## 参考

[Wireshark分析DHCP](https://blog.csdn.net/qq_24421591/article/details/50936469)
[DHCP协议原理及其实现流程(更详细)](https://blog.csdn.net/wuruixn/article/details/8282554)
[DHCP协议简析](https://www.jianshu.com/p/8bf8c7d04baf)
[dhcp 交互流程](https://my.oschina.net/xxjbs001/blog/861107)