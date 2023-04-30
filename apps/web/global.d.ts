// import {z} from 'zod'
// const publicEnv = z.object({
//   NEXT_PUBLIC_SERVER_URL: z.string(),
// });

// publicEnv.parse(process.env)

// interface ProcessEnv extends z.infer<typeof publicEnv> {}

interface Window {
  ethereum: {
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on?: (eventName: string, callback: (event: Event) => void) => void;
    removeListener?: (
      eventName: string,
      callback: (event: Event) => void
    ) => void;
  };
}
