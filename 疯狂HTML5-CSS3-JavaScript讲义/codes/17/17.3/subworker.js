onmessage = function(event)
{
	// 将数据提取出来。
	var data = event.data;
	// 提取所有质数
	var primeNums = data.result.split(",")
	var randResult = "";
	for (var i = 0 ; i < data.count ; i++ )
	{
		// 计算一个随机索引值
		var randIndex = Math.floor(Math.random()
			* (primeNums.length - 1));
		// 随机地"收集"一个质数
		randResult += (primeNums[randIndex] + ",");
	}
	// 发送消息，将会触发启动它的JavaScript脚本中
	// 对应Worker对象的onmessage方法
	postMessage(randResult);
}