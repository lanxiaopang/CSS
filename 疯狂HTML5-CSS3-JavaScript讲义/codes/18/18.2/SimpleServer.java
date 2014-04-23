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
 * <br/>网站: <a href="http://www.crazyit.org">疯狂Java联盟</a>
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
		// 创建ServerSocket，准备接受客户端连接
		ServerSocket ss = new ServerSocket(30000);
		// 接收到客户端连接
		Socket socket = ss.accept();
		// 得到Socket对应的输入流
		InputStream in = socket.getInputStream();
		// 得到Socket对应的输出流
		OutputStream out = socket.getOutputStream();
		byte[] buff = new byte[1024];
		int count = -1;
		String req = "";
		// 读取数据，此时建立与WebSocket的"握手"。
		count = in.read(buff);
		// 将读取的数据转化为字符串
		req = new String(buff , 0 , count);
		System.out.println("握手请求：" + req);
		// 获取WebSocket的key
		String secKey = getSecWebSocketKey(req);
		System.out.println("secKey = " + secKey);
		String response = "HTTP/1.1 101 Switching Protocols\r\nUpgrade: "
			+ "websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: "
				+ getSecWebSocketAccept(secKey) + "\r\n\r\n";
		System.out.println("secAccept = " + getSecWebSocketAccept(secKey));
		out.write(response.getBytes());
		// 再次读取WebSocket发送过来的数据
		count = in.read(buff);
		System.out.println("接收的字节数：" + count);
		/*
			因为WebSocket发送过来的数据遵循了一定的协议格式，
			其中第3个～第6个字节是数据掩码。
			从第7个字节开始才是真正的有效数据。
			因此程序使用第3个～第6个字节对后面的数据进行了处理
		*/
		for (int i = 0 ; i < count - 6 ; i++ )
		{
			buff[i + 6] = (byte) (buff[i % 4 + 2] ^ buff[i + 6]);
		}
		// 显示读取得到的数据
		System.out.println("接收的内容：" +  new String(buff
			, 6 , count - 6 , "UTF-8"));
		// 发送数据时，第一个字节必须与读到的第一个字节相同
		byte[] pushHead = new byte[2];
		pushHead[0] = buff[0];
		String pushMsg = "收到，收到！欢迎加入WebSocket世界！";
		// 发送数据时，第二个字节记录发送数据的长度
		pushHead[1] = (byte) pushMsg.getBytes("UTF-8").length;
		// 发送前两个字节
		out.write(pushHead);
		// 发送有效数据
		out.write(pushMsg.getBytes("UTF-8"));
		// 关闭Socket
		socket.close();
		// 关闭ServerSocket
		ss.close();
	}
	// 获取WebSocket请求的SecKey
	private String getSecWebSocketKey(String req)
	{
		//构建正则表达式，获取Sec-WebSocket-Key: 后面的内容
		Pattern p = Pattern.compile("^(Sec-WebSocket-Key:).+",
				Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
		Matcher m = p.matcher(req);
		if (m.find())
		{
			// 提取Sec-WebSocket-Key
			String foundstring = m.group();
			return foundstring.split(":")[1].trim();
		}
		else
		{
			return null;
		}
	}
	// 根据WebSocket请求的SecKey计算SecAccept
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