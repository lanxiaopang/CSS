var n = 1;
search: 
while (n < 99999) 
{
	// ��ʼ��Ѱ��һ������
	n += 1;
	for (var i = 2; i <= Math.sqrt(n); i++)
	{
		// �������n������Ϊ0����ʼ�ж���һ�����֡�
		if (n % i == 0)
		{
			continue search;
		}
	}
	// ��������
	postMessage(n);
}