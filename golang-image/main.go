package main

import (
	"fmt"
	"image"
	"log"
	"time"

	"github.com/disintegration/imaging"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func convertImage(bufImage image.Image, size int) {
	result := imaging.Resize(bufImage, size, 0,  imaging.Lanczos);
	name := fmt.Sprintf("IMAGE_SIZE_%v.jpg", size)
	err := imaging.Save(result, name)
	if err != nil {
		log.Fatalf("failed to save image: %v", err)
	}
}

func main() {
	bufImage, err := imaging.Open("./hoichoi.jpg")
	check(err)
	// fmt.Print(string(bufImage))

	i := 10
	c := 0
	start := time.Now().UnixNano() / int64(time.Millisecond)
	for x := 0; x < i; x++ {
		c += 100
		convertImage(bufImage, c)
	}
	end := time.Now().UnixNano() / int64(time.Millisecond)
	// diff := end -start
	fmt.Printf("Duration(ms): %d ms \n ", (end-start));
}
