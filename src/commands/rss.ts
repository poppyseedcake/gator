import { XMLParser } from "fast-xml-parser";
import { afterEach } from "node:test";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
    try {
        const resp = await fetch(feedURL, {
            headers: {
                'User-Agent': "gator"
            }
        });
        
        if (!resp.ok) {
            throw new Error(`${resp.status} ${resp.statusText}`);
          }
    
        const fetchedResponse = await resp.text();
        
        const parser = new XMLParser();
        const jObj = parser.parse(fetchedResponse);
        const channel = jObj["rss"]["channel"];
        
        if(!channel) {
          throw new Error("no channel in fetched data.");
        }
        
        const rssFeed: RSSFeed = {
          channel: {
            title: "",
            link: "",
            description: "",
            item: []
          }
        };

        const title = channel["title"];
        const link = channel["link"];
        const description = channel["description"];

        if(!title || !link || !description) {
          throw new Error("metadata are missing.");
        }

        rssFeed.channel.title = title;
        rssFeed.channel.link = link;
        rssFeed.channel.description = description;

        const items = [];
        if(!channel["item"]) {
          throw new Error("no item in channel");
        }

        if(Array.isArray(channel["item"])) {
          channel["item"].forEach((i) => {
            items.push(i);
          });
        } else if(channel["item"].length != 0) {
          items.push(channel["item"]);
        }
        
        const myRssItems: RSSItem[] = [];
        for (const key in items) {
          if(items[key].title && items[key].link && items[key].description && items[key].pubDate) {
            let myrssItem:RSSItem = {
              title: items[key].title,
              link: items[key].link,
              description: items[key].description,
              pubDate: items[key].pubDate
            }
            myRssItems.push(myrssItem);
          }
        }

        rssFeed.channel.item = myRssItems;

        return rssFeed;

        } catch (e) {
        throw new Error(
            `Error fetching URL '${feedURL}': ${(e as Error).message}`,
          );
        }
    }

export async function handleRss(cmdName: string, ...args: string[]) {
  const rss = await fetchFeed("https://www.wagslane.dev/index.xml");
  console.log(rss);
}