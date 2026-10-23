import { apiClient } from './client.js';

/**
 * Lấy danh sách phiếu yêu cầu bảo hành (hỗ trợ lọc theo SĐT, trạng thái, mức ưu tiên)
 */
export async function getTickets(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = `/tickets${queryParams ? `?${queryParams}` : ''}`;
  return apiClient(endpoint);
}

/**
 * Lấy chi tiết một phiếu yêu cầu theo ID (bao gồm lịch sử trạng thái)
 */
export async function getTicketDetail(ticketId) {
  return apiClient(`/tickets/${ticketId}`);
}

/**
 * Tạo mới phiếu yêu cầu bảo hành (Tiếp nhận phiếu)
 */
export async function createTicket(ticketData) {
  return apiClient('/tickets', {
    body: ticketData,
  });
}