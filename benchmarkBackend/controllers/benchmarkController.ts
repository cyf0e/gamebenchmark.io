import db from "../db/db";

export function validateCreateBenchmark(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      error: "Please send benchmark data in json format in the request body.",
    });
    return;
  }
  const { data, settings } = req.body;
  if (
    !data ||
    !settings ||
    !data.gameid ||
    !data.componentid ||
    !settings.resolution ||
    !settings.tooltip ||
    !(data.averagefps || data.zeroonefps || data.onefps)
  ) {
    //TODO: Make better error description
    res.status(400).json({
      error: ` Please refere to the documentation for the format this request needs to have.
         {
            data:{  gameid: string;
                    componentid: string;
                    settings?: string;
                    averagefps?: number;
                    zeroonefps?: number;
                    onefps?: number;
                },
            settings:{
                    resolution:string,
                    tooltip:string
            }   
        }  `,
    });
    return;
  }
  next();
}
export function createBenchmark(req, res, next) {
  db.createBenchmark(req.body)
    .then((ret) => {
      if (ret) {
        res.status(201).json(ret);
      }
    })
    .catch((e) => next(e));
}
