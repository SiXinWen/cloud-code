// 请将 AppId 改为你自己的 AppId
var appId = 'epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh';
var roomId = '5535e6dde4b078a907134b9f'
// 每个客户端自定义的 id
var clientId = 'qyz';
var rt;
var conv;
var convOld;
var firstFlag = true;

var sendBtn = document.getElementById('send-btn');
main();
sendBtn.addEventListener('click', sendMsg);
document.body.addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        sendMsg();
    }
});

function goBottom () {
    var dom = document.getElementById('discuss');
    dom.scrollTop = dom.scrollHeight;
}
// Demo 中聊天相关的主逻辑
function main() {
    goBottom();

    // 创建聊天实例（支持单页多实例）
    rt = AV.realtime({
        appId: appId,
        clientId: clientId,
        encodeHTML: true
    });

    // 实时通信服务连接成功
    rt.on('open', function() {

        console.log('open');
        // 因为断开重连还会触发一次 open 事件，所以用一个状态标记下
        if (firstFlag) {
            firstFlag = false;

            // 创建一个聊天室
            if (roomId){
                convOld = rt.conv(roomId, function(roomObject) {
                    if (roomObject){
                        roomObject.join(function() {
                            console.log('join success');
                            convOld.list(function(data) {
                                console.log(data);
                            });
                        });
                        roomObject.receive(function(data) {
                            console.log('qychen receive')
                            console.log(data);
                            var text = data.msg.text;
                            showLog(text, data.msg.attr.atitudeVal);
                            goBottom();
                        });
                    }
                    console.log('已经获取已有房间的实例');
                });
            }else{
                conv = convOld = rt.conv({
                    members: ['LeanCloud02'],
                    // 创建暂态的聊天室
                    // transient: true,
                    // 默认的数据，可以放 Conversation 名字等
                    data: {
                        title: 'testTitle'
                    }
                }, function(roomObject) {
                    roomObject.join(function() {
                        console.log('join syc');
                        convOld.list(function(data) {
                            console.log(data);
                        });
                    });
                    roomObject.receive(function(data) {
                        console.log('qychen receive')
                        console.log(data);
                        var text = data.msg.text;
                        showLog(text, data.msg.atitudeVal);
                        goBottom();
                    });
                    console.log('Conversation created callback');
                });
            }
        }
    });

    // 当聊天断开时触发
    rt.on('close', function() {
        console.log('close');
        console.log('实时通信服务被断开！');
    });

    // 当 Conversation 被创建时触发，当然您可以使用回调函数来处理，不一定要监听这个事件
    rt.on('create', function(data) {
        console.log('create');
        // 当前用户加入这个 Conversation 
        conv.join(function(data) {
            console.log('当前用户成功加入 Conversation');
        });
        // 向这个 Conversation 添加新的用户
        conv.add([
            'LeanCloud03', 'LeanCloud04'
        ], function(data) {
            console.log('成功添加用户：', data);
        });

        // 从这个 Conversation 中删除用户
        conv.remove('LeanCloud03', function(data) {
            console.log('成功删除用户：', data);
        });

        // 当前用户离开这个 Conversation 
        conv.leave(function(data) {
            console.log('当前用户成功离开 Conversation');
        });

        // 向这个 Conversation 中发送消息
        conv.send({
            abc: 123

        }, function(data) {
            console.log('发送的消息服务端已收收到：', data);

            // 查看历史消息
            conv.log(function(data) {
                console.log('查看当前 Conversation 最近的聊天记录：', data);
            });
        });

        // 向这个 Conversation 中发送暂态消息
        conv.send({
            msg: '当前用户正在输入。。。'
        }, {
            // 暂态消息，不需要回调
            transient: true
        }, function(data) {
            console.log('暂态消息的回调不会被运行');
        });

        // 向这个 Conversation 中发送消息，并且消息是否对方收到要有回执
        conv.send({
            abc: 123
        }, {
            // 获取阅读回执
            receipt: true
        }, function(data) {
            console.log('信息发送成功，该信息会获取阅读回执');
        });

        // 当前 Conversation 接收到消息
        conv.receive(function(data) {
            console.log('当前 Conversation 收到消息：', data);
        });

        // 当前 Conversation 接收到消息
        conv.receipt(function(data) {
            console.log('当前 Conversation 收到消息回执：', data);
        });

        // 获取当前 Conversation 中的成员信息
        conv.list(function(data) {
            console.log('列出当前 Conversation 的成员列表：', data);
        });

        // 发送多媒体消息
        conv.send({
            text: '图片测试',
            // 自定义的属性
            attr: {
                a:123
            },
            url: 'https://leancloud.cn/images/static/press/Logo%20-%20Blue%20Padding.png',
            metaData: {
                name:'logo',
                format:'png',
                height: 123,
                width: 123,
                size: 888
            }
        }, {
           type: 'image'
        }, function(data) {
            console.log('图片数据发送成功！');
        });

        // 取得当前 conv 中的人数
        console.log('open count');
        conv.count(function(num) {
            console.log('取得当前的用户数量：' + num);
        });
        console.log('rim', roomId);
        // 这是一个已有的对话，通过房间 id 生成它的对话实例
        convOld = rt.conv(roomId, function() {
            console.log('已经获取已有房间的实例');
        });
        console.log(convOld);
        convOld.add([
            'LeanCloud05', 'LeanCloud06'
        ], function(data) {
            console.log('已有的房间成功添加新的用户：', data);
        });

    });

    // 监听所有用户加入的情况
    rt.on('join', function(data) {
        console.log('有用户加入某个当前用户在的 Conversation：', data);
    });

    // 监听所有用户离开的情况
    rt.on('left', function(data) {
        console.log('有用户离开某个当前用户在的 Conversation：', data);
    });

    // 监听所有 Conversation 中发送的消息
    rt.on('message', function(data) {
        console.log('某个当前用户在的 Conversation 接收到消息：', data);
    });

    // 监听短信回执事件
    rt.on('receipt', function(data) {
        console.log('接收到消息阅读的回执：', data);
    });

    // 接收断线或者网络状况不佳的事件（断网可测试）
    rt.on('reuse', function() {
        console.log('正在重新连接。。。');
    });

    // 当然你可以关闭这一切
    // setTimeout(function() {
    //     rt.close();
    // }, 10000);

    var eventFun = function(data) {
        console.log('接收到自定义事件', data);
    };

    // 监听自定义事件
    rt.on('LeanCloud123', eventFun);

    // 取消绑定自定义事件
    rt.off('LeanCloud123', eventFun);

    // 派发自定义事件
    rt.emit('LeanCloud123', {
        test: 123
    });

}

// demo 中输出代码
function showLog(msg_text, at) {
   console.log('show log');
    console.log(msg_text);
    console.log(at);
    var div = document.getElementById('discuss');
    if(arguments.length==2){
        if(arguments[1]==true){
            new_div = '<div class="media"><div class="media-left"><a href="#"><img class="media-object" style="width:40px" '+
     'src="http://c.hiphotos.baidu.com/image/pic/item/1e30e924b899a9010e11b6301e950a7b0208f594.jpg" alt="..."></a>'+
     '</div><div class="media-body"><div class="leftbubblebox"><div class="left"><h4 class="media-heading" >' +msg_text + 
     '</h4></div></div></div></div>'
            div.innerHTML += new_div;

        }else{
            new_div = '<div class="media"><div class="media-body"><div class="media-body"><div class="rightbubblebox"><div class="right"><h4 class="media-heading">'+msg_text+'</h4></div></div></div></div>'+  '<div class="media-right"><a href="#"><img class="media-object" style="width:40px" '+ 'src="http://c.hiphotos.baidu.com/image/pic/item/1e30e924b899a9010e11b6301e950a7b0208f594.jpg" alt="..."></a>'+'</div>';
            div.innerHTML += new_div;
        }
    }else{
        console.log("bad arguments.");
    }
}

function sendMsg() {
    console.log('********sendMsg********');
    if (firstFlag) {
        alert('请先连接服务器！');
        return;
    }
    //msg
    var input = document.getElementById('new-msg');
    var val = input.value;
    //side
    var atitude = document.getElementById('Support');
    var bAtitude = new Boolean();
    bAtitude = atitude.checked;

    convOld.send({
        text:val,
        attr:{
            atitudeVal:bAtitude
        }
    }, {
        type:'text'
    }, function(data) {
        input.value = '';
        //add to Database Comments
        AV.initialize("epg58oo2271uuupna7b9awz9nzpcxes870uj0j0rzeqkm8mh", "xjgx65z5yavhg8nj4r48004prjelkq0fzz9xgricyb2nh0qq");
        var Comments = AV.Object.extend("Comments");
        var comment = new Comments();
        comment.set("Content",val);
        comment.set("Atitude",bAtitude);
        comment.save(null, {
            success: function(comment) {
                // Execute any logic that should take place after the object is saved.
                //   alert('New object created with objectId: ' + comment.id);
            },
            error: function(gameScore, error) {
                // Execute any logic that should take place if the save fails.
                // error is a AV.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.message);
            }
        });
        //add to Database end

        showLog(val,bAtitude);
        goBottom();
    });
}

