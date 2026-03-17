import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
  console.log(`Pourhouse Wine Co. API listening on port ${env.PORT}`);
});
