import { ServiceAccount } from "firebase-admin";
import "dotenv/config";

export const firebaseConfig: ServiceAccount = {
  projectId: process.env.FSA_PROJECT_ID,
  privateKey: process.env.FSA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  clientEmail: process.env.FSA_CLIENT_EMAIL,
};
