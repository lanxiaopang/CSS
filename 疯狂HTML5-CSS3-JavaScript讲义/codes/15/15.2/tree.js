var clickHandler = function()
{
	// ������Ҫ������HTMLԪ��id
	var targetId;
	// ������Ҫ��������HTMLԪ��
	var targetElement;
	// ���崥���¼����¼�Դ������event����ʽ���õ�ȫ�ֶ���
	var srcElement = event.srcElement;
	// ������className����ֵ�ж�������Ҷ�ӽڵ㣬���ýڵ����չ��
	if(srcElement.className.substr(0,7) == "outline")
	{
		// ����¼�Դ�����ڵ�ǰ��ͼƬ
		if(srcElement.id.indexOf("Image") > 0)
		{
			// ��ȡ�ýڵ��Ӧ<div.../>Ԫ�ص�id
			targetId = srcElement.id.substring(0
				, srcElement.id.length - 5)	+ "Details";
		}
		// ����¼�Դ�����ڵ����ڵ�<div.../>Ԫ��
		else
		{
			// ��ȡ�ýڵ��Ӧ<div.../>Ԫ�ص�id
			targetId = srcElement.id + "Details";
		}
		// �ҵ���Ӧ��<div.../>Ԫ��
		targetElement = document.getElementById(targetId);
		// ���targetElement�������
		if(targetElement)
		{
			// �����<div.../>Ԫ�ش��ڡ����ء�״̬
			if (targetElement.style.display == "none")
			{
				// ��ʾ��<div.../>Ԫ��
				targetElement.style.display = "";
			}
			else
			{
				// �������ظ�<div.../>Ԫ��
				targetElement.style.display = "none";
			}
		}
		// ����¼�Դ�����ڵ�ǰ��ͼƬ
		if (srcElement.id.indexOf("Image") > 0)
		{
			// ��ȡ�ýڵ�ǰ��<img.../>Ԫ�ص�id
			targetId = srcElement.id;
		}
		// ����¼�Դ�����ڵ����ڵ�<div.../>Ԫ��
		else
		{
			// ��ȡ�ýڵ�ǰ��<img.../>Ԫ�ص�id
			targetId = srcElement.id + "Image";
		}
		// �ҵ���Ӧ��<img.../>Ԫ��
		targetElement = document.getElementById(targetId);
		// �����<img.../>Ԫ������ʾ��ͼƬ�ǡ��Ӻš�ͼƬ
		if (targetElement.src.indexOf("plus") >= 0)
		{
			// ��<img.../>�ġ��Ӻš�ͼƬ��Ϊ�����š�ͼƬ
			targetElement.src = "image/minus.gif";
		}
		else
		{
			// ���򣬽�<img.../>�ġ����š�ͼƬ��Ϊ���Ӻš�ͼƬ
			targetElement.src = "image/plus.gif";
		}
	}
}
//Ϊҳ���ĵ���onclick�¼����¼�������
document.onclick = clickHandler;