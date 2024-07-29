// app/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://dwmglhdhykrtxniqhrgn.supabase.co";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3bWdsaGRoeWtydHhuaXFocmduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyNjYzMjYsImV4cCI6MjAzNzg0MjMyNn0.g1Rg5kmdHJUWCduDFWCAofJDzYxnkcDNzn4gloM6YWo";

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseKey = process.env.SUPABASE_KEY;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error(
//     "Supabase URL or Key is missing. Please check your environment variables."
//   );
// }

const supabase = createClient(SUPABASE_URL, SUPABASE_API_KEY);

export default supabase;
