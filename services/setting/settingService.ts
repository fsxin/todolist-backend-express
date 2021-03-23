import { RESPONSE_CODE } from '../../utils/constant';

export async function getSettings(req: any, res: any, next: any) {
  res.json({
    code: RESPONSE_CODE.SUCCESS,
    data: {
      userName: req.user.username,
    },
  });
}
