'use server';

/**
 * @fileOverview A flow for generating a customer confirmation email.
 *
 * - generateConfirmationEmail - Generates the email content.
 * - ConfirmationEmailInput - The input type for the email generation.
 * - ConfirmationEmailOutput - The return type for the email generation.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const ConfirmationEmailInputSchema = z.object({
  name: z.string().describe('The customer\'s name.'),
  email: z.string().email().describe('The customer\'s email address.'),
  phoneNumber: z.string().describe('The customer\'s phone number.'),
  deliveryLocation: z.string().describe('The delivery location.'),
  pincode: z.string().describe('The delivery pincode.'),
  numberOfItems: z.string().describe('The number of items ordered.'),
  itemsCode: z.string().describe('The codes of the items ordered.'),
  itemsCost: z.string().describe('The total cost of the items.'),
});

export type ConfirmationEmailInput = z.infer<typeof ConfirmationEmailInputSchema>;

export const ConfirmationEmailOutputSchema = z.object({
  subject: z.string().describe('The subject line of the email.'),
  body: z.string().describe('The HTML body of the email.'),
});

export type ConfirmationEmailOutput = z.infer<typeof ConfirmationEmailOutputSchema>;


export async function generateConfirmationEmail(input: ConfirmationEmailInput): Promise<ConfirmationEmailOutput> {
  return sendConfirmationEmailFlow(input);
}


const prompt = ai.definePrompt({
  name: 'generateConfirmationEmailPrompt',
  input: {schema: ConfirmationEmailInputSchema},
  output: {schema: ConfirmationEmailOutputSchema},
  prompt: `
    You are an AI assistant for an e-commerce store called ShopSphere.
    Your task is to generate a friendly and professional order confirmation email.

    The customer has just submitted an order through a contact form.
    Generate an email with the subject "Your ShopSphere Order is Confirmed!"

    The email body should be in HTML format.
    It should thank the customer by name for their order, confirm that it has been received, and tell them it will be processed shortly.
    It must also include a summary of the details they provided in the form.

    Here is the customer's information:
    - Name: {{name}}
    - Email: {{email}}
    - Phone Number: {{phoneNumber}}
    - Delivery Location: {{deliveryLocation}}
    - Pincode: {{pincode}}
    - Number of Items: {{numberOfItems}}
    - Item Codes: {{itemsCode}}
    - Total Cost: $ {{itemsCost}}

    Make sure the email is well-formatted, welcoming, and reassuring.
  `,
});

const sendConfirmationEmailFlow = ai.defineFlow(
  {
    name: 'sendConfirmationEmailFlow',
    inputSchema: ConfirmationEmailInputSchema,
    outputSchema: ConfirmationEmailOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    
    // In a real application, you would add your email sending logic here.
    // For example, using a service like Nodemailer, SendGrid, or AWS SES.
    console.log('---Simulating Sending Email---');
    console.log(`To: ${input.email}`);
    console.log(`Subject: ${output!.subject}`);
    console.log(`Body: \n${output!.body}`);
    console.log('-----------------------------');

    return output!;
  }
);
