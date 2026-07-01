import { BookOpen, ExternalLink, Video } from "lucide-react";
import { parseLessonBlocks, youtubeEmbedUrl, resolveMediaUrl } from "../../utils/lessonContent";

const LessonContent = ({ content, videoUrl, fileUrl, duration }) => {
  const blocks = parseLessonBlocks(content);
  const embed = youtubeEmbedUrl(videoUrl);
  const directVideo = videoUrl && !embed && videoUrl.match(/\.(mp4|webm|ogg)(\?|$)/i);

  return (
    <div className="flex flex-col gap-5">
      {embed && (
        <div className="rounded-xl overflow-hidden border border-[var(--border)] bg-black aspect-video">
          <iframe
            title="Course video"
            src={embed}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {directVideo && (
        <video controls className="w-full rounded-xl max-h-[420px] bg-black border border-[var(--border)]"
          src={resolveMediaUrl(videoUrl)} />
      )}

      {videoUrl && !embed && !directVideo && (
        <a href={videoUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-cyan-500 hover:underline">
          <Video size={14} /> Watch video lecture
        </a>
      )}

      <div className="flex flex-col gap-4">
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h3 key={i} className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 pt-2 border-t border-[var(--border)] first:border-0 first:pt-0">
                {block.text}
              </h3>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="list-disc list-inside text-sm text-[var(--text)] opacity-80 space-y-1 pl-1">
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          }
          if (block.type === "code") {
            return (
              <pre key={i} className="text-xs bg-[var(--bg)] border border-[var(--border)] rounded-lg p-3 overflow-x-auto">
                <code>{block.text}</code>
              </pre>
            );
          }
          return (
            <p key={i} className="text-sm text-[var(--text)] opacity-80 leading-relaxed whitespace-pre-wrap">
              {block.text}
            </p>
          );
        })}
      </div>

      {fileUrl && (
        <a href={resolveMediaUrl(fileUrl)} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm hover:border-cyan-500 transition-colors w-fit">
          <BookOpen size={15} className="text-cyan-500" />
          Supplementary resource (PDF / documentation)
          <ExternalLink size={13} className="opacity-40" />
        </a>
      )}

      {duration && (
        <p className="text-xs opacity-40">Estimated study time: {duration} minutes (video + reading + quiz)</p>
      )}
    </div>
  );
};

export default LessonContent;
