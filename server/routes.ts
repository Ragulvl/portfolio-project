import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  sendToIndianMessenger: z.boolean().optional().default(false)
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const message = await storage.saveContactMessage(validatedData);
      
      // If the user wants to send to Indian Messenger, handle that here
      if (validatedData.sendToIndianMessenger) {
        // In a real implementation, you would integrate with an Indian messenger API
        // For now, we'll just log it
        console.log(`Message also sent to Indian Messenger: ${validatedData.message}`);
      }
      
      res.status(201).json({ 
        success: true, 
        message: "Message sent successfully",
        data: message
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors
        });
      }
      
      console.error("Failed to send contact message:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
