function apdateHistoryState(routePath) {
  if (window.history.state && window.history.state.routePath === routePath) {
    window.history.replaceState({ routePath }, '', window.location.origin + routePath);
  } else {
    window.history.pushState({ routePath }, '', window.location.origin + routePath);
  }
}

export default apdateHistoryState;
