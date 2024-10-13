export interface OrderItem {
    id: string;          // ID do item do pedido
    productId: string;   // ID do produto associado a este item
    quantity: number;    // Quantidade do produto no pedido
    orderId: string;     // ID do pedido ao qual este item pertence
    created_at: string;  // Data de criação do item (formato ISO 8601)
    updated_at: string;  // Data da última atualização do item (formato ISO 8601)
  }