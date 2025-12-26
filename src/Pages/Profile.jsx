import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { uploadMediaAPI, mediaListAPI, deleteMediaAPI } from '../Hoc/api';

const Profile = () => {
  const [postType, setPostType] = useState('GALLERY');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [mediaList, setMediaList] = useState([]);
  const fileInputRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewItem, setPreviewItem] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    logout();
    document.body.classList.remove('overflow-hidden');
    navigate('/');
  };



  const getExtension = (item) => {
    const src = item.url || item.key || item.filename || '';
    const m = (item.mime || '').split('/').pop();
    const dot = src.lastIndexOf('.');
    if (m) return m.toLowerCase();
    if (dot >= 0) return src.slice(dot + 1).toLowerCase();
    return '';
  };

  const fileCategory = (item) => {
    const ext = getExtension(item);
    const imageExt = ['png','jpg','jpeg','webp','gif','svg'];
    const videoExt = ['mp4','webm','ogg'];
    if (imageExt.includes(ext)) return 'image';
    if (videoExt.includes(ext)) return 'video';
    if (ext === 'pdf') return 'pdf';
    if (['doc','docx','ppt','pptx','xls','xlsx'].includes(ext)) return 'office';
    return 'other';
  };

  const openPreview = (item) => {
    setPreviewItem(item);
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewItem(null);
  };

  useEffect(() => {
    fetchList(postType);
  }, [postType]);

  const fetchList = async (type) => {
    setLoading(true);
    setMessage('');
    try {
      const data = await mediaListAPI({ postType: type });
      // assuming API returns array under data.items or directly data
      setMediaList(data.data || data || []);
    } catch (err) {
      setMessage(err?.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files && e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('postType', postType);
      formData.append('file', file);

      const res = await uploadMediaAPI(formData);
      setMessage(res?.message || 'Upload successful');
      // refresh list
      await fetchList(postType);
      // clear file input
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setMessage(err?.message || JSON.stringify(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h2 style={{ margin: 0 }}>Media Upload</h2>
        {user && (
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ fontSize: 14 }}>Signed in as <strong>{user.name || user.email || user.id}</strong></div>
            <button onClick={handleLogout} className="e-secondary-btn" style={{ marginLeft: 8 }}>Logout</button>
          </div>
        )}
      </div>

      <div className="upload-form" style={{ maxWidth: 720 }}>
        <label style={{ display: 'block', marginBottom: 8 }}>Select Type</label>
        <select value={postType} onChange={e => setPostType(e.target.value)} style={{ padding: 8, width: 240 }}>
          <option value="BLOG">BLOG</option>
          <option value="GALLERY">GALLERY</option>
          <option value="MEDIA_TALKS">MEDIA_TALKS</option>
          <option value="COLLAB">COLLAB</option>
        </select>

        <div style={{ marginTop: 12 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Choose file</label>
          <input ref={fileInputRef} type="file" onChange={handleFileChange} />
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={handleUpload} disabled={loading} className="e-primary-btn has-icon">
            {loading ? 'Uploading…' : 'Upload'}
          </button>
        </div>

        {message && <div style={{ marginTop: 12 }} className="alert-message">{message}</div>}
      </div>

      <hr style={{ margin: '24px 0' }} />

      <h3>List: {postType}</h3>
      {loading && <div>Loading...</div>}
      <div className="media-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
        {mediaList && mediaList.length > 0 ? (
          mediaList.map((m, idx) => (
            <div key={m.id || idx} className="media-item" style={{ border: '1px solid #eee', padding: 8, position: 'relative' }}>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  const name = m.title || m.filename || m.id || 'this item';
                  const ok = window.confirm(`Delete ${name}?`);
                  if (!ok) return;
                  setLoading(true);
                  setMessage('');
                  try {
                    const params = m.id ? { id: m.id } : m.key ? { key: m.key } : { filename: m.filename };
                    const res = await deleteMediaAPI(params);
                    setMessage(res?.message || 'Deleted');
                    await fetchList(postType);
                  } catch (err) {
                    setMessage(err?.message || JSON.stringify(err));
                  } finally {
                    setLoading(false);
                  }
                }}
                title="Delete"
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 8px',
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-trash"></i>
              </button>
              {/* preview handled on image click */}
              {String(m.mime).includes('image') ? (
                <img
                  src={m.url}
                  alt={m.filename || 'media'}
                  style={{ width: '100%', height: 120, objectFit: 'cover' }}
                  onClick={() => openPreview(m)}
                />
              ) : (
                <div onClick={() => openPreview(m)} style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', cursor: 'pointer' }}>{m.filename || 'No preview'}</div>
              )}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{m.title || m.filename || m.id}</div>
                <div style={{ fontSize: 12, color: '#666' }}>{m.postType || ''}</div>
              </div>
            </div>
          ))
        ) : (
          <div>No items found for {postType}</div>
        )}
      </div>
      {previewOpen && previewItem && (
        <div
          className="preview-modal"
          onClick={closePreview}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              background: '#fff',
              padding: 12,
              borderRadius: 8,
              position: 'relative',
              overflow: 'auto'
            }}
          >
            <button onClick={closePreview} style={{ position: 'absolute', right: 8, top: 8, border: 'none', background: 'transparent', fontSize: 20, cursor: 'pointer' }} title="Close">×</button>
            {(() => {
              const url = previewItem.url 
              const cat = fileCategory(previewItem);
              if (cat === 'image') {
                return <img src={url} alt={previewItem.filename || ''} style={{ maxWidth: '100%', maxHeight: '80vh' }} />;
              }
              if (cat === 'video') {
                return <video controls src={url} style={{ width: '100%', maxHeight: '80vh' }} />;
              }
              if (cat === 'pdf') {
                return <iframe src={url} style={{ width: '100%', height: '80vh', border: 'none' }} title="pdf-preview" />;
              }
              if (cat === 'office') {
                return <iframe src={`https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`} style={{ width: '100%', height: '80vh', border: 'none' }} title="doc-preview" />;
              }
              return <div style={{ padding: 20 }}><a href={url} target="_blank" rel="noreferrer">Open / Download</a></div>;
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;