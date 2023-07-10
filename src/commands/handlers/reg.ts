import { MessageType } from '../../socket-message/enums/message-type.enum';
import { Users } from '../../api/users';
import { validateRegData } from '../validators/reg.validator';
import { Lobbies } from '../../api/lobbies';
import { WSData } from '../interfaces/ws-data.interface';
import { sendResponse } from '../send-response';

export function handleReg({ client, server }: WSData, data: string): void {
  const regData = validateRegData(JSON.parse(data));

  let responseData;

  try {
    const user = Users.verifyUser(regData.name, regData.password);
    user.socket = client;

    sendResponse(server, MessageType.UPDATE_ROOM, Lobbies.getOpenLobbyList());
    responseData = { name: user.login, index: user.id, error: false, errorText: '' };
  } catch (err) {
    const errorText = err instanceof Error ? err.message : 'Internal error';
    responseData = { name: regData.name, index: -1, error: true, errorText };
  }

  sendResponse(client, MessageType.REG, responseData);
}
