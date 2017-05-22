from PIL import Image

listfile = open("data/photos", "r")

# imageNames = ["8013.jpg", "9142.jpg", "6954.jpg"]
imageNames = listfile.read().split("\n")
del imageNames[-1]
print imageNames

imageNames = imageNames[0:50]

n = len(imageNames)


images = [Image.open("data/img/" + imageName) for imageName in imageNames]

width,height = images[0].size

sum = [[[0]*3 for _ in range(0, height)] for _ in range(0, width)]

for image in images:
    px = image.load()
    
    for x in range(0, width):
        for y in range(0, height):
            for c in range(0, 3):
                sum[x][y][c] += px[x,y][c]

avgImg = Image.new("RGB", (width,height))

avgPx = avgImg.load()

for x in range(0, width-1):
    for y in range(0, height-1):
        col = (sum[x][y][0]/n, sum[x][y][1]/n, sum[x][y][2]/n)
        avgPx[x,y] = col
