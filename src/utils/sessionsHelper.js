// utils/sessionsHelper.js

// =======================
// KONSTANTA & GLOBAL SESSIONS
// =======================

const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 menit

export const operatorOptionSessions = {};  // { chatId: {timeout} }
export const adminOptionSessions = {};     // { chatId: {timeout} }
const clientRequestSessions = {};          // { chatId: {step, data, ...} }

// =======================
// UTILITY UNTUK TIMEOUT
// =======================

// Timeout untuk pilihan operator/menu user
export function setOperatorOptionTimeout(chatId) {
  if (operatorOptionSessions[chatId]?.timeout) {
    clearTimeout(operatorOptionSessions[chatId].timeout);
  }
  const MENU_TIMEOUT = 2 * 60 * 1000; // 2 menit
  operatorOptionSessions[chatId].timeout = setTimeout(() => {
    delete operatorOptionSessions[chatId];
  }, MENU_TIMEOUT);
}

// Timeout untuk pilihan admin
export function setAdminOptionTimeout(chatId) {
  if (adminOptionSessions[chatId]?.timeout) {
    clearTimeout(adminOptionSessions[chatId].timeout);
  }
  const MENU_TIMEOUT = 2 * 60 * 1000; // 2 menit
  adminOptionSessions[chatId].timeout = setTimeout(() => {
    delete adminOptionSessions[chatId];
  }, MENU_TIMEOUT);
}

// =======================
// UTILITY UNTUK SESSION CLIENTREQUEST
// =======================

/**
 * Set session untuk clientrequest.
 * @param {string} chatId 
 * @param {object} data 
 */
export function setSession(chatId, data) {
  clientRequestSessions[chatId] = { ...data, time: Date.now() };
}

/**
 * Get session untuk clientrequest. Otomatis auto-expire setelah timeout.
 * @param {string} chatId 
 * @returns {object|null}
 */
export function getSession(chatId) {
  const s = clientRequestSessions[chatId];
  if (!s) return null;
  if (Date.now() - s.time > SESSION_TIMEOUT) {
    delete clientRequestSessions[chatId];
    return null;
  }
  return s;
}

/**
 * Hapus session clientrequest untuk chatId.
 * @param {string} chatId 
 */
export function clearSession(chatId) {
  delete clientRequestSessions[chatId];
}

// =======================
// END OF FILE
// =======================
