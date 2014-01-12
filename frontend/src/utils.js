function supports_local_storage () {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    console.log('no local storage support');
    return false;
  }
}
