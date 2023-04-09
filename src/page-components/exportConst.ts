export enum ERoles {
  ANT = 'ant',
  ANT_MANAGER = 'antManager',
  ANT_OFFICER = 'antOfficer',
  DEVELOPER = 'developer',
}

export interface IWorkBorders {
  id: number;
  name: string;
}

export const roleOptions = [
  { value: ERoles.ANT, label: 'Ant' },
  { value: ERoles.ANT_MANAGER, label: 'Ant Manager' },
  { value: ERoles.ANT_OFFICER, label: 'Ant Officer' },
  { value: ERoles.DEVELOPER, label: 'Developer' },
];

export const workBordersOptions = [
  { value: { id: 1, name: 'Белгатой' }, label: 'Белгатой' },
  { value: { id: 2, name: 'Шали' }, label: 'Шали' },
  { value: { id: 3, name: 'Урус-Мартан' }, label: 'Урус-Мартан' },
];
