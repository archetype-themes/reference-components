import dotenv from "dotenv"

async function globalSetup(config) {
  dotenv.config({
    path: ".env",
    override: true
  })
}

export default globalSetup
