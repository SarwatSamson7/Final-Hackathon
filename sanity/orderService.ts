import { client } from  "../sanity/lib/client"

export const createOrder = async (orderData: any) => {
  try {
    const response = await client.create({
      _type: "order",
      ...orderData,
      createdAt: new Date().toISOString(),
    });

    console.log("Order Created:", response);
    return response;
  } catch (error) {
    console.error("Error creating order:", error);
  }
};
