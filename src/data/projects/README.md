# Projects Data Structure

This directory contains the project data and documentation for the portfolio website.

## Structure

- `index.ts` - Main project data definitions and exports
- `*.md` - Individual project README files with detailed descriptions
- `projectUtils.ts` - Utility functions for loading project data

## Adding New Projects

1. Add project data to the `projectsData` array in `index.ts`
2. Create a corresponding `.md` file with the project ID as filename
3. Include detailed project description, features, and technical details in the markdown file

## Project Data Schema

```typescript
interface ProjectData {
  id: string; // Unique identifier (used for README filename)
  title: string; // Project title
  duration: {
    // Project timeline
    start: string; // Start date (YYYY-MM-DD)
    end: string | null; // End date or null if ongoing
    timezone: null; // Timezone (currently unused)
  };
  github: string | null; // GitHub repository URL
  demo: string | null; // Demo video URL
  ios: string | null; // iOS App Store URL
  android: string | null; // Android Play Store URL
  tech: Array<{
    // Technology stack
    id: string; // Tech ID
    name: string; // Display name
    color: string; // Color theme
  }>;
  description: string | null; // Short description
  coverImage: string | null; // Cover image URL
  site: string | null; // Live site URL
  readmeContent?: string; // Loaded markdown content
}
```

## Benefits of Local Data

- **Performance**: No external API calls during build time
- **Independence**: No dependency on external services
- **Control**: Full control over content and formatting
- **Offline Development**: Works without internet connection
- **Version Control**: Project descriptions are version controlled
- **Rich Content**: Support for markdown formatting, code blocks, and links
