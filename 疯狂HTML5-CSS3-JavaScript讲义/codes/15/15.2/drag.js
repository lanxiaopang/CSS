var drag = function(target, event)
{
	// ���忪ʼ�϶�ʱ�����λ�ã����window���꣩
	var startX = event.clientX;
	var startY = event.clientY;
	// ���彫Ҫ���϶�Ԫ�ص�λ�ã������document���꣩
	// ��Ϊ��target��positionΪabsolutely��
	// ������Ϊ�����ڵ�����ϵ��document
	var origX = target.offsetLeft;
	var origY = target.offsetTop;
	// ��Ϊ�������event��clientX��clientY����ȡ���λ��ʱ��
	// ֻ�ܻ�ȡwindows����ϵ��λ�ã�������Ҫ����window����ϵ
	// ��document����ϵ��ƫ�ơ�
	// ����windows����ϵ��document����ϵ֮���ƫ��
	var deltaX = startX - origX;
	var deltaY = startY - origY;
	// ���ø�Ԫ��ֱ�Ӳ�����¼�
	target.setCapture();
	// ����ƶ����¼�������
	var moveHandler = function()
	{
		// ����IE�¼�ģ�ͣ���ȡ�¼�����
		var evt = window.event; 
		// �����϶�Ԫ�ص�λ���ƶ�����ǰ���λ�á�
		// �Ƚ�window����ϵλ��ת����document����ϵλ�ã����޸�Ŀ������CSSλ�á�
		target.style.left = (evt.clientX - deltaX) + "px";
		target.style.top = (evt.clientY - deltaY) + "px";
		// ��ֹ�¼�ð��
		evt.cancelBubble=true;
	}
	// ����ɿ����¼�������
	var upHandler = function() 
	{
		// ����IE�¼�ģ�ͣ���ȡ�¼�����
		var evt = window.event; 
		// ȡ���ö����ϰ󶨵��¼�������
		target.detachEvent("onlosecapture", upHandler);
		target.detachEvent("onmouseup", upHandler);
		target.detachEvent("onmousemove", moveHandler);
		// �ͷŸö���ġ��¼�����
		target.releaseCapture();
		// ��ֹ�¼�ð��
		evt.cancelBubble=true;
	}
	// Ϊ��Ԫ������ƶ�ʱ���¼�������
	target.attachEvent("onmousemove", moveHandler);
	// Ϊ����ɿ�ʱ���¼�������
	target.attachEvent("onmouseup", upHandler);
	// ��ʧȥ�����¼���������ɿ�����
	target.attachEvent("onlosecapture", upHandler);
	// ��ֹ�¼�ð��
	event.cancelBubble=true;
	event.returnValue = false;
}