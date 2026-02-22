import { createClient } from "@sanity/client";
import * as fs from "fs";

// Manually parse .env file
const envConfig = fs.readFileSync(".env", "utf8")
  .split("\n")
  .reduce((acc, line) => {
    const [key, ...valueMatches] = line.split("=");
    if (key && valueMatches.length > 0) {
      acc[key.trim()] = valueMatches.join("=").trim().replace(/(^"|"$)/g, "");
    }
    return acc;
  }, {} as Record<string, string>);

const client = createClient({
  projectId: "06wdodaa", // using the project ID from the user's error log
  dataset: envConfig.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: envConfig.SANITY_API_TOKEN,
  apiVersion: "2024-02-22",
});

async function fixReferences() {
  console.log("Fetching documents with legacy projectManager data...");

  // query for documents where projectManager has extra fields besides _type, _ref, _key, _weak
  const query = `*[_type in ["clientProject", "demoProject"] && (defined(projectManager.email) || defined(projectManager.name) || defined(projectManager.phone) || defined(projectManager.image))]`;
  
  const docs = await client.fetch(query);

  if (docs.length === 0) {
    console.log("No documents found needing fixing.");
    return;
  }

  console.log(`Found ${docs.length} documents. Preparing to patch...`);

  const transaction = client.transaction();

  for (const doc of docs) {
    console.log(`Adding patch for document ID: ${doc._id}`);
    
    // Unset the extra legacy fields inside the projectManager reference object
    transaction.patch(doc._id, (p) =>
      p.unset([
        "projectManager.email",
        "projectManager.name",
        "projectManager.phone",
        "projectManager.image",
      ])
    );
  }

  try {
    console.log("Committing transaction...");
    const result = await transaction.commit();
    console.log("Transaction committed successfully:", result);
  } catch (err) {
    console.error("Error committing transaction:", err);
  }
}

fixReferences().catch(console.error);
