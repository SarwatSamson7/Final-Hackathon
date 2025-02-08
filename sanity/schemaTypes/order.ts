import { defineType } from "sanity";

export const order = defineType({
    name: "order",
    title: "Order",
    type: "document",
    fields: [
      {
        name: "customer",
        title: "Customer",
        type: "object",
        fields: [
          { name: "name", title: "Name", type: "string" },
          { name: "email", title: "Email", type: "string" },
          { name: "address", title: "Address", type: "string" },
          { name: "phone", title: "Phone", type: "string" },
        ],
      },
      {
        name: "items",
        title: "Items",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              { name: "productId", title: "Product ID", type: "string" },
              { name: "title", title: "Product Name", type: "string" },
              { name: "quantity", title: "Quantity", type: "number" },
              { name: "price", title: "Price", type: "number" },
            ],
          },
        ],
      },
      {
        name: "total",
        title: "Total Price",
        type: "number",
      },
      {
        name: "status",
        title: "Order Status",
        type: "string",
        options: {
          list: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        },
      },
      {
        name: "createdAt",
        title: "Created At",
        type: "datetime",
        options: {
          dateFormat: "YYYY-MM-DD",
          timeFormat: "HH:mm:ss",
        },
      },
    ],
  });
  