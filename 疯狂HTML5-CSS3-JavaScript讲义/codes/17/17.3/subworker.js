onmessage = function(event)
{
	// ��������ȡ������
	var data = event.data;
	// ��ȡ��������
	var primeNums = data.result.split(",")
	var randResult = "";
	for (var i = 0 ; i < data.count ; i++ )
	{
		// ����һ���������ֵ
		var randIndex = Math.floor(Math.random()
			* (primeNums.length - 1));
		// �����"�ռ�"һ������
		randResult += (primeNums[randIndex] + ",");
	}
	// ������Ϣ�����ᴥ����������JavaScript�ű���
	// ��ӦWorker�����onmessage����
	postMessage(randResult);
}