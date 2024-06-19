/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const { GoogleAIFileManager } = require("@google/generative-ai/files");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  /**
   * Uploads the given file to Gemini.
   *
   * See https://ai.google.dev/gemini-api/docs/prompting_with_media
   */
  async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    // TODO Make these files available on the local file system
    // You may need to update the file paths
    const files = [
      await uploadToGemini("image_transportation1.jpeg", "image/jpeg"),
      await uploadToGemini("image_architecture3.jpeg", "image/jpeg"),
      await uploadToGemini("Picsart_24-04-07_00-40-50-820.jpg", "image/jpeg"),
    ];
  
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Act as a image analyzer whenever a user sends an image you tell the information about the image. "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Please send me your image! I'm not able to actually \"see\" images yet, but I can analyze image descriptions. Tell me everything you can about the picture, including:\n\n* **The subject:** What is the main focus of the image?  Are there people, objects, landscapes, or something else entirely?\n* **The composition:** How are the elements arranged? Is it symmetrical, chaotic, balanced? \n* **The colors:** Are the colors bright, muted, warm, cool? What is the overall color scheme?\n* **The lighting:** Is the lighting natural or artificial? Is it bright, dim, high contrast? \n* **The mood or feeling:** What kind of emotion does the image evoke? Is it happy, sad, peaceful, exciting? \n\nThe more information you provide, the better I can understand the image and provide you with insights. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[0].mimeType,
                fileUri: files[0].uri,
              },
            },
          ],
        },
        {
          role: "model",
          parts: [
            {text: "The image shows a bright blue train moving through a lush, green forest. \n\nHere's a breakdown:\n\n* **Subject:**  The main subject is the train, specifically a passenger train with multiple cars. It's painted a vibrant blue and appears modern and well-maintained. \n* **Composition:** The train dominates the center of the image, traveling from left to right along a curving set of tracks. This leads the viewer's eye along the path of the train. The lush green forest forms a natural frame around the train, creating a sense of depth and highlighting the journey through nature. \n* **Colors:**  The dominant color is the vibrant blue of the train, which contrasts beautifully with the surrounding greenery. The green itself varies in shades, suggesting a diverse and thriving forest.  The overall impression is one of freshness and vitality.\n* **Lighting:** The lighting seems to be natural, likely overcast daylight, as it's soft and even, without harsh shadows. This enhances the colors and contributes to a peaceful atmosphere.\n* **Mood:** The image evokes a feeling of peaceful travel and adventure. The train, a symbol of journey and exploration, combined with the beautiful natural setting, suggests a sense of discovery and tranquility. \n\n**Overall Impression:** This is a captivating image that uses color, composition, and subject matter to create a sense of adventure, the beauty of nature, and the allure of travel to far-off places.  It could easily be featured in travel magazines or brochures promoting scenic train routes. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[1].mimeType,
                fileUri: files[1].uri,
              },
            },
          ],
        },
        {
          role: "model",
          parts: [
            {text: "This image captures the iconic Taj Mahal in Agra, India, renowned for its breathtaking beauty and architectural grandeur. \n\nLet's break it down:\n\n* **Subject:** The image prominently features the Taj Mahal, a white marble mausoleum, standing majestically on a raised platform. The building, with its central dome, flanking minarets, and intricate details, is the undeniable focal point.  \n* **Composition:**  The composition is strikingly symmetrical.  The Taj Mahal sits perfectly centered, reflected in the long, rectangular pool that stretches towards the viewer. This symmetry emphasizes the building's balance and harmony, further highlighted by the identical minarets framing the dome and the evenly spaced cypress trees along the sides.\n* **Colors:** The image is bathed in a soft, warm light, likely during the golden hour near sunrise or sunset. This gentle illumination casts a golden hue on the white marble of the Taj Mahal, making it glow. The sky, a mix of light blue and soft pinks and oranges from the sun, provides a serene backdrop. The green of the grass and trees offers a touch of vibrancy while remaining subtle. \n* **Lighting:**  The lighting, likely natural and diffused, creates soft shadows and a warm, almost ethereal glow. It emphasizes the intricate details of the Taj Mahal's architecture.  The calm surface of the water reflects the sky and building, doubling the visual impact. \n* **Mood:**  The overall mood evoked is one of tranquility, awe, and serenity.  The symmetrical composition, the soft light, and the majestic subject matter combine to create a sense of peace and wonder.  \n\n**Overall Impression:** This stunning image masterfully captures the Taj Mahal's beauty and spiritual essence.  The skillful use of composition, light, and color elevates the image beyond a mere snapshot, transforming it into a work of art that inspires awe and admiration. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {
              fileData: {
                mimeType: files[2].mimeType,
                fileUri: files[2].uri,
              },
            },
          ],
        },
        {
          role: "model",
          parts: [
            {text: "The image shows a young man with a friendly and approachable demeanor.\n\nHere's a breakdown:\n\n* **Subject:** The subject is a young man, likely a teenager or young adult, wearing a light gray t-shirt. He has dark brown hair styled upwards, a light mustache, and is wearing black-framed glasses.  \n* **Composition:** The composition is a simple headshot, with the young man centered in the frame against a solid, vibrant purple background. This direct and straightforward composition brings all the focus to his face and expression. \n* **Colors:** The image has a high-contrast color scheme. The vibrant purple background provides a bold backdrop, making the young man's face stand out. His light skin tone and gray t-shirt offer a neutral contrast, further emphasizing his face as the primary focus. \n* **Lighting:** The lighting seems artificial, possibly from a camera flash or indoor lighting. It's evenly distributed on the subject's face, minimizing shadows and creating a clear, well-lit portrait. \n* **Mood:** The image conveys a sense of approachability and friendliness. The young man's slight smile and direct gaze give him an open and engaging demeanor. The vibrant purple background adds a touch of energy and modernity.\n\n**Overall Impression:** This is a simple yet effective portrait that portrays the young man in a positive and welcoming light. The use of color and composition effectively focuses attention on his face and expression.  \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();