var push = AV.push({
    appId: appId,
    appKey: appKey
});

// 发送一条推送，如果不传 channels 则是给所有 channel 发送消息
push.send({
    // channels: ['aaa'],
    data: {LeanCloud: 123}
}, function(result) {
    if (result) {
        console.log('推送成功发送');
    } else {
        console.log('error');
    }
});

// 如果想接收推送，需要调用 open 方法，开启和服务器的连接
push.open(function() {
    console.log('连接服务器成功，可以接收推送');
});

// 监听推送消息
push.on('message', function(data) {
    console.log('message');
    console.log(JSON.stringify(data));
});

// 监听网络异常，SDK 会在底层自动重新连接服务器
push.on('reuse', function() {
    console.log('网络中断正在重试。。。');
});