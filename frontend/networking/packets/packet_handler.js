import PacketType from './packet_type'
import * as ClientPacket from './server/server_packets'
export const receivePacket = (packet) => {
    const packetData = packet.data;
    switch(packet.type){
        case PacketType.RECEIVE_CHANNEL:
        
            const rcp = ClientPacket.ReceiveChannel.new(packetData)
            
        break
    }
}
export const sendPacket = (packet) => {
    App.clientChannel.send(packet);
}