onmessage = function(event)
{
	// ��������ȡ������
	var data = JSON.parse(event.data);
	// ȡ��start����
	var start = data.start;
	// ȡ��end����
	var end = data.end;
	// ȡ��count����
	var count = data.count;
	var result = "";
	search:
	for (var n = start ; n <= end ; n++)
	{
		for (var i = 2; i <= Math.sqrt(n); i ++)
		{
			// �������n������Ϊ0����ʼ�ж���һ�����֡�
			if (n % i == 0)
			{
				continue search;
			}
		}
		// �Ѽ��ҵ�������
		result += (n + ",");
	}
	// �ٴ�����Worker�߳�
	var sub = new Worker("subworker.js");
	// ����Ҫ��������ݴ���������Worker�߳���
	sub.postMessage({result: result , count : count});
	sub.onmessage = function(event)
	{
		// ������Ϣ�����ᴥ��ǰ̨JavaScript�ű���
		// Worker�����onmessage����
		postMessage(event.data);
	}
}