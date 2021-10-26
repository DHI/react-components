import { Status } from '../types';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

export const MENU_ITEMS = [
  {
    id: 'execute',
    label: 'Execute',
    condition: {
      field: '!lastJob.status', // Prefix with exclamation if you wish to inverse the condition test
      value: ['Pending', 'InProgress'],
    },
    taskId: 'workflowJsonDocument',
  },
  {
    id: 'edit',
    label: 'Edit',
    condition: {
      field: '!lastJob.status',
      value: ['Pending', 'InProgress'],
    },
  },
  {
    id: 'clone',
    label: 'Clone',
  },
  {
    id: 'delete',
    label: 'Delete',
  },
  {
    id: 'terminate',
    label: 'Terminate',
  },
  {
    id: 'openPdf',
    label: 'Open PDF',
    condition: {
      field: 'lastJob.status',
      value: ['Completed'],
    },
  },
];

export const STATUS = [
  {
    name: 'Pending',
    color: 'orange',
    message: 'Pending',
    Icon: HourglassEmptyIcon,
  },
  {
    name: 'Starting',
    color: 'orange',
    message: 'Starting',
    Icon: HourglassEmptyIcon,
  },
  {
    name: 'InProgress',
    color: 'orange',
    message: 'Running',
    Icon: AccessTimeIcon,
  },
  {
    name: 'Unknown',
    color: 'black',
    message: 'Unknown',
    Icon: LockOpenIcon,
  },
  {
    name: 'ReadyToInitiate',
    color: 'red',
    message: 'Ready',
    Icon: LockOpenIcon,
  },
  {
    name: 'Completed',
    color: 'green',
    message: 'Completed',
    Icon: LockOutlinedIcon,
  },
  {
    name: 'Error',
    color: 'black',
    message: 'Error',
    Icon: FiberManualRecordIcon,
  },
  {
    name: 'Unknown',
    color: 'purple',
    message: 'Unknown',
    Icon: FiberManualRecordIcon,
  },
  {
    name: 'Default',
    color: 'black',
    message: 'Cancel',
    Icon: FiberManualRecordIcon,
  },
  {
    name: 'Cancelling',
    color: 'orange',
    message: 'Cancelling',
    Icon: FiberManualRecordIcon,
  },
  {
    name: 'Cancelled',
    color: 'grey',
    message: 'Cancelled',
    Icon: RadioButtonUncheckedIcon,
  },
  {
    name: 'Cancel',
    color: 'grey',
    message: 'Unknown',
    Icon: RadioButtonUncheckedIcon,
  },
] as Status[];

export const TRANSLATIONS = {
  executeConfirmation:
    'Ini akan memulai pekerjaan baru di latar belakang. Status akan berubah setelah penyelesaian pekerjaan. Anda yakin ingin mengeksekusi',
  terminateConfirmation:
    'Ini akan membatalkan pekerjaan yang sedang dieksekusi. Status akan berubah setelah pembatalan pekerjaan. Anda yakin ingin mengakhiri',
  cloneConfirmation:
    'Ini akan memulai pekerjaan baru di latar belakang. Anda dapat menghapus skenario kloning ini nanti. Anda yakin ingin mengkloning',
  deleteConfirmation:
    'Ini akan menghapus skenario yang dipilih dari daftar. Setelah dihapus, Anda tidak dapat mengambil data. Anda yakin ingin menghapus',
  cancelLabel: 'Batal',
  confirmLabel: 'Lanjut',
};
