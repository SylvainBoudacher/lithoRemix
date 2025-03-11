import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export async function loader() {
  return json({
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
  });
}

export default function Pictures() {
  const { ENV } = useLoaderData<typeof loader>();
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (image) {
      console.log(image);

      const supabaseUrl = ENV.SUPABASE_URL || "";
      const supabaseKey = ENV.SUPABASE_SERVICE_ROLE_KEY || "";

      console.log(supabaseUrl, supabaseKey);

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.storage
        .from("lithoRemixBuck")
        .upload(`/stones/${image.name}`, image);

      if (error) {
        console.error(error);
      } else {
        console.log(data);
      }
    }
  };

  return (
    <>
      <Input
        name="image"
        placeholder="Image"
        className="max-w-xs"
        accept="image/*"
        type="file"
        onChange={handleImageChange}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </>
  );
}
