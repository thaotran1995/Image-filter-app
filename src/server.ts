import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  app.get( "/filteredimage", async ( req: express.Request, res: express.Response) => {
    const image_url: string = req.query.image_url as string;
    let list_image_url: Array<string> = [];
    // validate the image_url query
    if(!image_url){
      return res.status(400).send(`image_url is required`);
    }
    // Call filterImageFromURL(image_url) to filter the image
    const resultPath: string = await filterImageFromURL(image_url);
    if(!!resultPath){
      list_image_url.push(resultPath);
      res.status(200).sendFile(resultPath, async () => await deleteLocalFiles(list_image_url));
    }
  });

  // Root Endpoint
  app.get( "/", async ( req: express.Request, res: express.Response ) => {
    res.send("Hello I'm Alita ThaoTT26 From FPT")
  } );

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();