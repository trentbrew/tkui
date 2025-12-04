# Rolldown-Vite Implementation

This project now uses **Rolldown-Vite**, a high-performance Rust-based bundler that serves as the future foundation of Vite.

## What is Rolldown-Vite?

Rolldown-Vite is a drop-in replacement for Vite that uses:

- **Rolldown**: A Rust-based next-generation bundler
- **Oxc**: High-performance JavaScript tools (parser, transformer, resolver, minifier)

## Benefits

Based on real-world usage, Rolldown-Vite provides:

- **3x to 16x faster** production builds
- **Up to 100x less** memory usage during builds
- No `esbuild` dependency (uses Oxc for all transformations)

## Implementation

The implementation uses pnpm's `overrides` feature to replace Vite with Rolldown-Vite:

```json
{
  "pnpm": {
    "overrides": {
      "vite": "npm:rolldown-vite@latest"
    }
  }
}
```

This approach is recommended for meta-frameworks like Nuxt that list Vite as a peer dependency.

## Current Status

- ✅ Dev server running on port 9876
- ✅ Production builds working
- ✅ All Nuxt features compatible
- ⚠️ Some warnings about sourcemaps (expected during technical preview)

## Build Performance

Current build times:

- **Client build**: ~4.3s
- **Server build**: ~1.7s
- **Total build time**: ~20s (including font downloads and Nitro server build)

## Migration Path

Rolldown-Vite is currently in technical preview (Phase One). The roadmap:

1. **Phase One (Current)**: Separate `rolldown-vite` package for early adopters
2. **Phase Two**: Changes merged into main Vite codebase with opt-in full-bundle mode
3. **Phase Three**: Full-bundle mode becomes default for Vite

## Resources

- [Announcement Post](https://voidzero.dev/posts/announcing-rolldown-vite)
- [Rolldown Documentation](https://rolldown.rs/)
- [Migration Guide](https://main.vite.dev/guide/rolldown#compatibility)
- [Rolldown Discord](https://chat.rolldown.rs/)

## Reporting Issues

If you encounter issues with Rolldown-Vite:

- Report them in the [rolldown-vite repository](https://github.com/vitejs/rolldown-vite)
- NOT in the main Vite repository
