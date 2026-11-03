
import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import './AdminDashboard.css';

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'testimonies', label: 'Testimonies', icon: '📖' },
  { id: 'comments', label: 'Comments', icon: '💬' },
  { id: 'reports', label: 'Reports', icon: '🛡️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const INITIAL_STATS = [
  { label: 'Total Testimonies', value: '...', icon: '📖', note: 'Community stories' },
  { label: 'Pending Testimonies', value: '...', icon: '⏳', note: 'Awaiting moderation' },
  { label: 'Community Comments', value: '...', icon: '💬', note: 'Community discussions' },
  { label: 'Open Reports', value: '...', icon: '🛡️', note: 'Awaiting resolution' },
];

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [statsError, setStatsError] = useState('');
  const [loading, setLoading] = useState(true);

  const [testimonies, setTestimonies] = useState([]);
  const [testimoniesLoading, setTestimoniesLoading] = useState(false);
  const [testimoniesError, setTestimoniesError] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState('');
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportsError, setReportsError] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('open');

  const pageTitles = {
    overview: 'Dashboard Overview',
    testimonies: 'Testimony Management',
    comments: 'Community Comments',
    reports: 'Reported Content',
    settings: 'Dashboard Settings',
  };

  async function loadStats() {
    if (!supabase) {
      setStatsError('Supabase is not configured.');
      setLoading(false);
      return;
    }

    try {
      const [
        totalResult,
        pendingResult,
        commentsResult,
        reportsResult,
      ] = await Promise.all([
        supabase.from('testimonies').select('id', { count: 'exact', head: true }),
        supabase.from('testimonies').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('testimony_comments').select('id', { count: 'exact', head: true }),
        supabase.from('testimony_reports').select('id', { count: 'exact', head: true }).eq('status', 'open'),
      ]);

      const error =
        totalResult.error ||
        pendingResult.error ||
        commentsResult.error ||
        reportsResult.error;

      if (error) throw error;

      const counts = [
        totalResult.count,
        pendingResult.count,
        commentsResult.count,
        reportsResult.count,
      ];

      setStats((current) =>
        current.map((item, index) => ({
          ...item,
          value: counts[index] ?? 0,
        }))
      );

      setStatsError('');
    } catch (error) {
      setStatsError(error.message || 'Unable to load statistics.');
    } finally {
      setLoading(false);
    }
  }

  async function loadTestimonies() {
    if (!supabase) {
      setTestimoniesError('Supabase is not configured.');
      return;
    }

    setTestimoniesLoading(true);
    setTestimoniesError('');

    try {
      const { data, error } = await supabase
        .from('testimonies')
        .select('id, title, body, category, status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTestimonies(data || []);
    } catch (error) {
      setTestimoniesError(error.message || 'Unable to load testimonies.');
    } finally {
      setTestimoniesLoading(false);
    }
  }

  async function loadComments() {
    if (!supabase) {
      setCommentsError('Supabase is not configured.');
      return;
    }

    setCommentsLoading(true);
    setCommentsError('');

    try {
      const { data, error } = await supabase
        .from('testimony_comments')
        .select('id, testimony_id, user_id, body, status, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setComments(data || []);
    } catch (error) {
      setCommentsError(error.message || 'Unable to load comments.');
    } finally {
      setCommentsLoading(false);
    }
  }

  async function loadReports() {
    if (!supabase) {
      setReportsError('Supabase is not configured.');
      return;
    }

    setReportsLoading(true);
    setReportsError('');

    try {
      const { data, error } = await supabase
        .from('testimony_reports')
        .select('id, testimony_id, reporter_id, reason, created_at, status, resolved_by, resolved_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setReports(data || []);
    } catch (error) {
      setReportsError(error.message || 'Unable to load reports.');
    } finally {
      setReportsLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    if (activeView === 'testimonies') {
      loadTestimonies();
    }
  }, [activeView]);

  useEffect(() => {
    if (activeView === 'comments') loadComments();
    if (activeView === 'reports') loadReports();
  }, [activeView]);

  async function updateTestimonyStatus(id, newStatus) {
    const confirmed = window.confirm(
      `Are you sure you want to ${newStatus} this testimony?`
    );

    if (!confirmed) return;

    setActionLoading(id);
    setSuccessMessage('');
    setTestimoniesError('');

    try {
      const { error } = await supabase
        .from('testimonies')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setSuccessMessage(`Testimony ${newStatus} successfully.`);

      await Promise.all([
        loadTestimonies(),
        loadStats(),
      ]);
    } catch (error) {
      setTestimoniesError(
        error.message || 'Unable to update testimony status.'
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function updateCommentStatus(id, newStatus) {
    setActionLoading(`comment-${id}`);
    setSuccessMessage('');
    setCommentsError('');

    try {
      const { error } = await supabase
        .from('testimony_comments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setSuccessMessage(`Comment ${newStatus} successfully.`);
      await Promise.all([loadComments(), loadStats()]);
    } catch (error) {
      setCommentsError(error.message || 'Unable to update comment status.');
    } finally {
      setActionLoading(null);
    }
  }

  async function updateReportStatus(report, newStatus) {
    setActionLoading(`report-${report.id}`);
    setSuccessMessage('');
    setReportsError('');

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Your administrator session has expired. Sign in again.');

      const resolution = newStatus === 'resolved'
        ? { status: newStatus, resolved_by: user.id, resolved_at: new Date().toISOString() }
        : { status: newStatus, resolved_by: null, resolved_at: null };
      const { error } = await supabase
        .from('testimony_reports')
        .update(resolution)
        .eq('id', report.id);

      if (error) throw error;

      setSuccessMessage(`Report ${newStatus} successfully.`);
      await Promise.all([loadReports(), loadStats()]);
    } catch (error) {
      setReportsError(error.message || 'Unable to update report status.');
    } finally {
      setActionLoading(null);
    }
  }

  const filteredTestimonies = testimonies.filter((item) => {
    const title = (item.title || '').toLowerCase();
    const body = (item.body || '').toLowerCase();
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      title.includes(search) || body.includes(search);

    const matchesStatus =
      statusFilter === 'all' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  function formatDate(date) {
    if (!date) return 'Date unavailable';

    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  return (
    <div className="lifeos-admin">

      <aside className={`lifeos-admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <div className="admin-brand-icon">✦</div>
          <div>
            <h2>LIFEOS</h2>
            <span>THE LIVING WORD</span>
          </div>
        </div>

        <div className="admin-sidebar-label">MAIN MENU</div>

        <nav className="admin-navigation">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={
                activeView === item.id
                  ? 'admin-nav-item active'
                  : 'admin-nav-item'
              }
              onClick={() => {
                setActiveView(item.id);
                setMenuOpen(false);
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <span>✦</span>
          <p>Growing in Faith.<br />Serving with Love.</p>
        </div>
      </aside>

      <main className="lifeos-admin-main">

        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div>
            <h1>{pageTitles[activeView]}</h1>
            <p>Welcome to your LIFEOS administration center.</p>
          </div>

          <div className="admin-user">
            <span>✦</span>
            <div>
              <strong>Administrator</strong>
              <small>Management Portal</small>
            </div>
          </div>
        </header>

        <section className="admin-content">

          {activeView === 'overview' && (
            <>
              <div className="admin-welcome">
                <div>
                  <span className="admin-eyebrow">THE LIVING WORD</span>
                  <h2>Welcome back, Administrator.</h2>
                  <p>
                    Manage testimonies, community discussions and
                    reports from one place.
                  </p>
                </div>
                <div className="admin-welcome-icon">✝</div>
              </div>

              <div className="admin-section-heading">
                <div>
                  <h2>Platform Statistics</h2>
                  <p>A summary of your LIFEOS community.</p>
                </div>

                <button
                  className="admin-refresh"
                  onClick={() => {
                    setLoading(true);
                    loadStats();
                  }}
                >
                  ↻ Refresh
                </button>
              </div>

              {statsError && (
                <div className="admin-error">{statsError}</div>
              )}

              <div className="admin-stats-grid">
                {stats.map((item) => (
                  <article className="admin-stat-card" key={item.label}>
                    <div className="admin-stat-top">
                      <span>{item.label}</span>
                      <span className="admin-stat-icon">{item.icon}</span>
                    </div>
                    <h3>{loading ? '...' : item.value}</h3>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>

              <div className="admin-bottom-card">
                <div>
                  <span className="admin-bottom-icon">📖</span>
                  <h2>Faith in Action</h2>
                  <p>
                    Every testimony is an opportunity to encourage
                    someone and share God's goodness.
                  </p>
                </div>
              </div>
            </>
          )}

          {activeView === 'testimonies' && (
            <div className="admin-testimonies">

              <div className="admin-section-heading">
                <div>
                  <h2>Testimony Management</h2>
                  <p>Review and manage community testimonies.</p>
                </div>

                <button
                  className="admin-refresh"
                  onClick={loadTestimonies}
                  disabled={testimoniesLoading}
                >
                  ↻ {testimoniesLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              <div className="admin-testimony-toolbar">
                <input
                  type="search"
                  placeholder="Search testimonies..."
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  aria-label="Search testimonies"
                />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  aria-label="Filter testimonies by status"
                >
                  <option value="all">All statuses</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {successMessage && (
                <div className="admin-success" role="status">
                  {successMessage}
                </div>
              )}

              {testimoniesError && (
                <div className="admin-error" role="alert">
                  {testimoniesError}
                </div>
              )}

              {testimoniesLoading ? (
                <div className="admin-placeholder">
                  <span>⏳</span>
                  <h2>Loading testimonies...</h2>
                </div>
              ) : filteredTestimonies.length === 0 ? (
                <div className="admin-placeholder">
                  <span>📖</span>
                  <h2>No testimonies found</h2>
                  <p>
                    {testimonies.length === 0
                      ? 'There are no testimonies available yet.'
                      : 'Try changing your search or status filter.'}
                  </p>
                </div>
              ) : (
                <div className="admin-testimony-list">
                  {filteredTestimonies.map((item) => (
                    <article
                      className="admin-testimony-card"
                      key={item.id}
                    >
                      <div className="admin-testimony-header">
                        <div>
                          <span className="admin-testimony-category">
                            {(item.category || 'Uncategorized').replace('_', ' ')}
                          </span>
                          <h3>{item.title || 'Untitled Testimony'}</h3>
                        </div>

                        <span className={`admin-status ${item.status}`}>
                          {item.status || 'unknown'}
                        </span>
                      </div>

                      <p className="admin-testimony-body">
                        {item.body || 'No testimony content provided.'}
                      </p>

                      <div className="admin-testimony-meta">
                        <span>📅 {formatDate(item.created_at)}</span>
                      </div>

                      <div className="admin-testimony-actions">
                        {item.status !== 'approved' && (
                          <button
                            className="admin-approve-button"
                            disabled={actionLoading === item.id}
                            onClick={() =>
                              updateTestimonyStatus(item.id, 'approved')
                            }
                          >
                            {actionLoading === item.id
                              ? 'Please wait...'
                              : '✓ Approve'}
                          </button>
                        )}

                        {item.status !== 'rejected' && (
                          <button
                            className="admin-reject-button"
                            disabled={actionLoading === item.id}
                            onClick={() =>
                              updateTestimonyStatus(item.id, 'rejected')
                            }
                          >
                            ✕ Reject
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'comments' && (
            <div className="admin-records">
              <div className="admin-section-heading">
                <div>
                  <h2>Community Comments</h2>
                  <p>Review and moderate comments on testimonies.</p>
                </div>
                <button className="admin-refresh" onClick={loadComments} disabled={commentsLoading}>
                  ↻ {commentsLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              {successMessage && <div className="admin-success" role="status">{successMessage}</div>}
              {commentsError && <div className="admin-error" role="alert">{commentsError}</div>}

              {commentsLoading ? (
                <div className="admin-placeholder"><h2>Loading comments...</h2></div>
              ) : comments.length === 0 ? (
                <div className="admin-placeholder"><span>💬</span><h2>No comments found</h2></div>
              ) : (
                <div className="admin-record-list">
                  {comments.map((comment) => (
                    <article className="admin-record-card" key={comment.id}>
                      <div className="admin-testimony-header">
                        <div>
                          <span className={`admin-status ${comment.status}`}>{comment.status}</span>
                          <p className="admin-record-meta">{formatDate(comment.created_at)} · Testimony {comment.testimony_id.slice(0, 8)}</p>
                        </div>
                      </div>
                      <p className="admin-testimony-body">{comment.body}</p>
                      <div className="admin-testimony-actions">
                        {comment.status !== 'approved' && (
                          <button className="admin-approve-button" disabled={actionLoading === `comment-${comment.id}`} onClick={() => updateCommentStatus(comment.id, 'approved')}>
                            Approve
                          </button>
                        )}
                        {comment.status !== 'rejected' && (
                          <button className="admin-reject-button" disabled={actionLoading === `comment-${comment.id}`} onClick={() => updateCommentStatus(comment.id, 'rejected')}>
                            Reject
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'reports' && (
            <div className="admin-records">
              <div className="admin-section-heading">
                <div>
                  <h2>Community Reports</h2>
                  <p>Review reports and record their resolution.</p>
                </div>
                <button className="admin-refresh" onClick={loadReports} disabled={reportsLoading}>
                  ↻ {reportsLoading ? 'Loading...' : 'Refresh'}
                </button>
              </div>

              <div className="admin-testimony-toolbar">
                <select value={reportStatusFilter} onChange={(event) => setReportStatusFilter(event.target.value)} aria-label="Filter reports by status">
                  <option value="open">Open reports</option>
                  <option value="resolved">Resolved reports</option>
                  <option value="all">All reports</option>
                </select>
              </div>

              {successMessage && <div className="admin-success" role="status">{successMessage}</div>}
              {reportsError && <div className="admin-error" role="alert">{reportsError}</div>}

              {reportsLoading ? (
                <div className="admin-placeholder"><h2>Loading reports...</h2></div>
              ) : reports.filter((report) => reportStatusFilter === 'all' || report.status === reportStatusFilter).length === 0 ? (
                <div className="admin-placeholder"><span>🛡️</span><h2>No {reportStatusFilter === 'all' ? '' : `${reportStatusFilter} `}reports found</h2></div>
              ) : (
                <div className="admin-record-list">
                  {reports
                    .filter((report) => reportStatusFilter === 'all' || report.status === reportStatusFilter)
                    .map((report) => (
                      <article className="admin-record-card" key={report.id}>
                        <div className="admin-testimony-header">
                          <div>
                            <span className={`admin-status ${report.status}`}>{report.status}</span>
                            <p className="admin-record-meta">{formatDate(report.created_at)} · Testimony {report.testimony_id.slice(0, 8)}</p>
                          </div>
                        </div>
                        <p className="admin-testimony-body">{report.reason}</p>
                        <div className="admin-testimony-actions">
                          <button
                            className={report.status === 'open' ? 'admin-approve-button' : 'admin-refresh'}
                            disabled={actionLoading === `report-${report.id}`}
                            onClick={() => updateReportStatus(report, report.status === 'open' ? 'resolved' : 'open')}
                          >
                            {report.status === 'open' ? 'Mark resolved' : 'Reopen report'}
                          </button>
                        </div>
                      </article>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeView === 'settings' && (
            <div className="admin-placeholder">
              <span>⚙️</span>
              <h2>Dashboard Settings</h2>
              <p>No administrator settings table is configured for this project.</p>
            </div>
          )}

        </section>

        <footer className="admin-footer">
          LIFEOS © {new Date().getFullYear()} — The Living Word
        </footer>

      </main>
    </div>
  );
}
