import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import sun.misc.BASE64Encoder;

/**
 * Description:
 * <br/>��վ: <a href="http://www.crazyit.org">���Java����</a>
 * <br/>Copyright (C), 2001-2012, Yeeku.H.Lee
 * <br/>This program is protected by copyright laws.
 * <br/>Program Name:
 * <br/>Date:
 * @author Yeeku.H.Lee kongyeeku@163.com
 * @version 1.0
 */
public class SimpleServer
{
	public SimpleServer()throws Exception
	{
		// ����ServerSocket��׼�����ܿͻ�������
		ServerSocket ss = new ServerSocket(30000);
		// ���յ��ͻ�������
		Socket socket = ss.accept();
		// �õ�Socket��Ӧ��������
		InputStream in = socket.getInputStream();
		// �õ�Socket��Ӧ�������
		OutputStream out = socket.getOutputStream();
		byte[] buff = new byte[1024];
		int count = -1;
		String req = "";
		// ��ȡ���ݣ���ʱ������WebSocket��"����"��
		count = in.read(buff);
		// ����ȡ������ת��Ϊ�ַ���
		req = new String(buff , 0 , count);
		System.out.println("��������" + req);
		// ��ȡWebSocket��key
		String secKey = getSecWebSocketKey(req);
		System.out.println("secKey = " + secKey);
		String response = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: "
			+ "websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: "
				+ getSecWebSocketAccept(secKey) + "\r\n\r\n";
		System.out.println("secAccept = " + getSecWebSocketAccept(secKey));
		out.write(response.getBytes());
		// �ٴζ�ȡWebSocket���͹���������
		count = in.read(buff);
		System.out.println("���յ��ֽ�����" + count);
		/*
			��ΪWebSocket���͹�����������ѭ��һ����Э���ʽ��
			���е�3������6���ֽ����������롣
			�ӵ�7���ֽڿ�ʼ������������Ч���ݡ�
			��˳���ʹ�õ�3������6���ֽڶԺ�������ݽ����˴���
		*/
		for (int i = 0 ; i < count - 6 ; i++ )
		{
			buff[i + 6] = (byte) (buff[i % 4 + 2] ^ buff[i + 6]);
		}
		// ��ʾ��ȡ�õ�������
		System.out.println("���յ����ݣ�" +  new String(buff
			, 6 , count - 6 , "UTF-8"));
		// ��������ʱ����һ���ֽڱ���������ĵ�һ���ֽ���ͬ
		byte[] pushHead = new byte[2];
		pushHead[0] = buff[0];
		String pushMsg = "�յ����յ�����ӭ����WebSocket���磡";
		// ��������ʱ���ڶ����ֽڼ�¼�������ݵĳ���
		pushHead[1] = (byte) pushMsg.getBytes("UTF-8").length;
		// ����ǰ�����ֽ�
		out.write(pushHead);
		// ������Ч����
		out.write(pushMsg.getBytes("UTF-8"));
		// �ر�Socket
		socket.close();
		// �ر�ServerSocket
		ss.close();
	}
	// ��ȡWebSocket�����SecKey
	private String getSecWebSocketKey(String req)
	{
		//����������ʽ����ȡSec-WebSocket-Key: ���������
		Pattern p = Pattern.compile("^(Sec-WebSocket-Key:).+",
				Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
		Matcher m = p.matcher(req);
		if (m.find())
		{
			// ��ȡSec-WebSocket-Key
			String foundstring = m.group();
			return foundstring.split(":")[1].trim();
		}
		else
		{
			return null;
		}
	}
	// ����WebSocket�����SecKey����SecAccept
	private String getSecWebSocketAccept(String key)
		throws Exception
	{
		String guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
		key += guid;
		MessageDigest md = MessageDigest.getInstance("SHA-1");
		md.update(key.getBytes("ISO-8859-1") , 0 , key.length());
		byte[] sha1Hash = md.digest();
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(sha1Hash);
	}
	public static void main(String[] args)
		throws Exception
	{
		new SimpleServer();
	}
}