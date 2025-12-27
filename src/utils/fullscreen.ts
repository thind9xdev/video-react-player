type FullscreenElement = Element & {
  webkitRequestFullscreen?: () => Promise<void> | void;
  mozRequestFullScreen?: () => Promise<void> | void;
  msRequestFullscreen?: () => Promise<void> | void;
};

type FullscreenDocument = Document & {
  webkitExitFullscreen?: () => Promise<void> | void;
  webkitFullscreenElement?: Element | null;
  webkitFullscreenEnabled?: boolean;
  mozCancelFullScreen?: () => Promise<void> | void;
  mozFullScreenElement?: Element | null;
  mozFullScreenEnabled?: boolean;
  msExitFullscreen?: () => Promise<void> | void;
  msFullscreenElement?: Element | null;
  msFullscreenEnabled?: boolean;
};

// Lazily grab the document to avoid SSR "document is not defined" errors.
const doc: FullscreenDocument | null =
  typeof document !== 'undefined' ? document : null;

class Fullscreen {
  request(elm: FullscreenElement) {
    if (elm.requestFullscreen) {
      elm.requestFullscreen();
    } else if (elm.webkitRequestFullscreen) {
      elm.webkitRequestFullscreen();
    } else if (elm.mozRequestFullScreen) {
      elm.mozRequestFullScreen();
    } else if (elm.msRequestFullscreen) {
      elm.msRequestFullscreen();
    }
  }

  exit() {
    if (!doc) {
      return;
    }

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }

  get isFullscreen() {
    if (!doc) {
      return null;
    }

    return (
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    );
  }

  get enabled() {
    if (!doc) {
      return false;
    }

    return (
      doc.fullscreenEnabled ||
      doc.webkitFullscreenEnabled ||
      doc.mozFullScreenEnabled ||
      doc.msFullscreenEnabled
    );
  }

  addEventListener(handler: (event: Event) => void) {
    if (!doc) {
      return;
    }

    doc.addEventListener('fullscreenchange', handler);
    doc.addEventListener('webkitfullscreenchange', handler);
    doc.addEventListener('mozfullscreenchange', handler);
    doc.addEventListener('MSFullscreenChange', handler);
  }

  removeEventListener(handler: (event: Event) => void) {
    if (!doc) {
      return;
    }

    doc.removeEventListener('fullscreenchange', handler);
    doc.removeEventListener('webkitfullscreenchange', handler);
    doc.removeEventListener('mozfullscreenchange', handler);
    doc.removeEventListener('MSFullscreenChange', handler);
  }
}

export default new Fullscreen();
