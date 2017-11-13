import { remote } from 'electron';
import i18n from '../../shared/i18n';
import { default as swal } from 'sweetalert2';
import '../styles/lib/sweetalert.global';
import styles from '../styles/sweetalert';

const { dialog } = remote;
const currentWindow = remote.getCurrentWindow();

export function showConfirmDialog(message, fn) {
  const buttons = ['Yes', 'No'];
  dialog.showMessageBox(currentWindow, { message, buttons }, resp => {
    fn(resp);
  });
}

export function showDialog(message, type = 'error') {
  dialog.showMessageBox(currentWindow, {
    type,
    message
  });
}

export function showPasswordDialog(preConfirm, options = {}) {
  const defaultFunc = password => Promise.resolve(password);
  if (typeof preConfirm === 'object') {
    options = preConfirm;
    preConfirm = defaultFunc;
  } else if (typeof preConfirm === 'undefined') {
    preConfirm = defaultFunc;
  }
  return swal({
    title: i18n.formatMessage({ id: 'master-password' }),
    input: 'password',
    showCancelButton: true,
    animation: false,
    customClass: styles.alert,
    confirmButtonClass: styles.confirm,
    confirmButtonText: i18n.formatMessage({ id: 'confirm' }),
    cancelButtonClass: styles.cancel,
    cancelButtonText: i18n.formatMessage({ id: 'nevermind' }),
    inputPlaceholder: i18n.formatMessage({ id: 'password' }),
    inputClass: styles.input,
    buttonsStyling: false,
    ...options,
    preConfirm
  });
}
