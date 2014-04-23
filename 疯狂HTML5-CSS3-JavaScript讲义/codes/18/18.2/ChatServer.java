import java.io.*;
import java.net.*;
import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.util.regex.*;
import java.util.*;

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
public class ChatServer
{
	// ��¼���еĿͻ���Soccket
	public static List<Socket> clientSockets
		= new ArrayList<Socket>();
	public ChatServer()throws IOException
	{
		// ����ServerSocket��׼�����ܿͻ�������
		ServerSocket ss = new ServerSocket(30000);
		while(true)
		{
			// ���յ��ͻ�������
			Socket socket = ss.accept();
			// ���ͻ���Socket��ӵ�clientSockets������
			clientSockets.add(socket);
			// �����߳�
			new ServerThread(socket).start();
		}
	}
	public static void main(String[] args)
		throws Exception
	{
		new ChatServer();
	}
}
class ServerThread extends Thread
{
	private Socket socket;
	public ServerThread(Socket socket)
	{
		this.socket = socket;
	}
	public void run()
	{
		try
		{
			// �õ�Socket��Ӧ��������
			InputStream in = socket.getInputStream();
			// �õ�Socket��Ӧ�������
			OutputStream out = socket.getOutputStream();
			byte[] buff = new byte[1024];
			String req = "";
			// ��ȡ���ݣ���ʱ������WebSocket��"����"��
			int count = in.read(buff);
			// �����ȡ�����ݳ��ȴ���0
			if(count > 0)
			{
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
			}
			int hasRead = 0;
			// ���϶�ȡWebSocket���͹���������
			while((hasRead = in.read(buff)) > 0)
			{
				System.out.println("���յ��ֽ�����" + hasRead);
				/*
					��ΪWebSocket���͹�����������ѭ��һ����Э���ʽ��
					���е�3������6���ֽ����������롣
					�ӵ�7���ֽڿ�ʼ������������Ч���ݡ�
					��˳���ʹ�õ�3������6���ֽڶԺ�������ݽ����˴���
				*/
				for (int i = 0 ; i < hasRead - 6 ; i++ )
				{
					buff[i + 6] = (byte) (buff[i % 4 + 2] ^ buff[i + 6]);
				}
				// ��ô���������͹���������
				String pushMsg = new String(buff
					, 6 , hasRead - 6 , "UTF-8");
				// ����Socket���ϣ�������ÿ��Socket��������
				for (Iterator<Socket> it = ChatServer.clientSockets.iterator()
					; it.hasNext() ;)
				{
					try
					{
						Socket s = it.next();
						// ��������ʱ����һ���ֽڱ���������ĵ�һ���ֽ���ͬ
						byte[] pushHead = new byte[2];
						pushHead[0] = buff[0];
						// ��������ʱ���ڶ����ֽڼ�¼�������ݵĳ���
						pushHead[1] = (byte) pushMsg.getBytes("UTF-8").length;
						// ����ǰ�����ֽ�
						s.getOutputStream().write(pushHead);
						// ������Ч����
						s.getOutputStream().write(pushMsg.getBytes("UTF-8"));
					}
					catch (SocketException ex)
					{
						// �����׽���쳣��������Socket�Ѿ��ر�
						// ����Socket��Socket������ɾ��
						it.remove();
					}
				}
			}
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				// �ر�Socket
				socket.close();
			}
			catch (IOException ex)
			{
				ex.printStackTrace();
			}
		}
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
}