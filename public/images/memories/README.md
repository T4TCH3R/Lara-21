# Adding Lara's photos (and one video)

Drop files here named:

```
memory-01.jpg
memory-02.jpg
memory-03.jpg
memory-04.jpg
memory-05.jpg
memory-06.jpg
memory-07.jpg
memory-08.mp4   <- this one's a video
```

Any of them can be missing — the game shows a placeholder frame instead of
breaking (a photo icon for images, a clapperboard icon for the video).

Want a different memory to be the video, different filenames, more/fewer
memories, or different captions? Edit `src/data/memories.js` — set
`type: "video"` on whichever entry should play a video (`.mp4` works
everywhere; keep it reasonably short/compressed) and `type: "image"` on the
rest. Also update `totalMemories` in `src/config/birthdayConfig.js` if you
change the total count.

JPG or PNG for photos. Keep files reasonably sized (photos under ~500KB,
the video under a few MB) so the game keeps loading quickly.
