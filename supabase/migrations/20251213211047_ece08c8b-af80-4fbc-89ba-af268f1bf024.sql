-- Insert admin role for evan@licoat.com
INSERT INTO public.user_roles (user_id, role)
VALUES ('2b5e5a1e-5818-4c1b-8b8c-157cbd6d84b4', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;